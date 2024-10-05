import PseudoTimeStudyButton from "./PseudoTimeStudyButton.js";
import PseudoTimeStudyConnection from "./PseudoTimeStudyConnection.js";

import { STUDY_TREE_LAYOUT_TYPE, TimeStudyTreeLayout } from "../../tabs/time-studies/time-study-tree-layout.js";

export const ForceBoughtState = {
  notBought: 0,
  unspecified: 1,
  bought: 2,

  getState(forceState, currentState) {
    switch (forceState) {
      case this.notBought:
        return false;
      case this.unspecified:
        return currentState;
      case this.bought:
        return true;
    }
    return currentState;
  }
};

export default {
  name: "TimeStudiesTab",
  components: {
    PseudoTimeStudyButton,
    PseudoTimeStudyConnection,
  },
  props: {
    disregardCurrentStudies: {
      type: Boolean,
      default: false
    },
    newStudies: {
      required: true,
      validator: newStudies => Array.isArray(newStudies) || newStudies === undefined,
    },
    showPreview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      layoutType: STUDY_TREE_LAYOUT_TYPE.NORMAL,
      vLevel: 0,
      renderedStudyCount: 0,
      isEnslaved: false,
      delayTimer: 0,
    };
  },
  computed: {
    layout() {
      return TimeStudyTreeLayout.create(this.layoutType, 0.15);
    },
    studies() {
      return this.layout.studies;
    },
    connections() {
      return this.layout.connections;
    },
    treeStyleObject() {
      return {
        width: `${this.layout.width}rem`,
        height: `${this.layout.height}rem`
      };
    },
    respecClassObject() {
      return {
        "o-primary-btn--subtab-option": true,
        "o-primary-btn--respec-active": this.respec
      };
    }
  },
  watch: {
    vLevel() {
      // When vLevel changes, we recompute the study tree because of triad studies
      this.$recompute("layout");
    }
  },
  methods: {
    update() {
      this.layoutType = STUDY_TREE_LAYOUT_TYPE.current;
      this.vLevel = Ra.pets.v.level;
      this.isEnslaved = Enslaved.isRunning || Date.now() - this.delayTimer < 1000;
    },
    studyComponent(study) {
      switch (study.type) {
        case TIME_STUDY_TYPE.NORMAL: return NormalTimeStudy;
        case TIME_STUDY_TYPE.ETERNITY_CHALLENGE: return ECTimeStudy;
        case TIME_STUDY_TYPE.DILATION: return DilationTimeStudy;
        case TIME_STUDY_TYPE.TRIAD: return TriadTimeStudy;
      }
      throw "Unknown Time Study type";
    },
    studyString(study) {
      switch (study.type) {
        case TIME_STUDY_TYPE.NORMAL: case TIME_STUDY_TYPE.TRIAD: return `${study.id}`;
        case TIME_STUDY_TYPE.ETERNITY_CHALLENGE: return `EC${study.id}`;
      }
      return "Dilation Study";
    },
    getStudyForceBoughtState(studyStr) {
      if (!this.disregardCurrentStudies) return ForceBoughtState.unspecified;
      return this.newStudies.includes(studyStr) ? ForceBoughtState.bought : ForceBoughtState.notBought;
    },
    getConnectionForceBoughtState(setup) {
      if (!this.disregardCurrentStudies) return ForceBoughtState.unspecified;
      return (this.newStudies.includes(this.studyString(setup.connection.to)) &&
        this.newStudies.includes(this.studyString(setup.connection.from)))
        ? ForceBoughtState.bought
        : ForceBoughtState.notBought;
    }
  },
  template: `
  <div
    class="l-study-string-preview__tree--wrapper"
    data-v-study-string-preview
  >
    <div
      v-if="showPreview"
      class="l-time-study-tree l-study-string-preview__tree"
      :style="treeStyleObject"
      data-v-study-string-preview
    >
      <PseudoTimeStudyButton
        v-for="setup in studies"
        :key="setup.study.type.toString() + setup.study.id.toString()"
        :setup="setup"
        :force-is-bought="getStudyForceBoughtState(studyString(setup.study))"
        :is-new-from-import="!disregardCurrentStudies && newStudies.includes(studyString(setup.study))"
      />
      <svg
        :style="treeStyleObject"
        class="l-time-study-connection"
      >
        <PseudoTimeStudyConnection
          v-for="(setup, index) in connections"
          :key="'connection' + index"
          :force-is-bought="getConnectionForceBoughtState(setup)"
          :setup="setup"
        />
      </svg>
    </div>
    <span
      v-else
      class="c-unavailable-warning"
      data-v-study-string-preview
    >
      Preview Unavailable
    </span>
  </div>
  `
};