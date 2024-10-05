import * as tslib from "./tslib.js";
import Decimal from "./break_infinity.js"

export const ADNotations = (function (exports, Decimal, tslib) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Decimal__default = /*#__PURE__*/_interopDefaultLegacy(Decimal);

  var Settings = {
    isInfinite: function isInfinite(decimal) {
      return decimal.gte(Decimal__default["default"].MAX_VALUE);
    },
    exponentCommas: {
      show: true,
      min: 100000,
      max: 1000000000
    },
    exponentDefaultPlaces: 3
  };

  function commaSection(value, index) {
    if (index === 0) {
      return value.slice(-3);
    }

    return value.slice(-3 * (index + 1), -3 * index);
  }

  function addCommas(value) {
    return Array.from(Array(Math.ceil(value.length / 3))).map(function (_, i) {
      return commaSection(value, i);
    }).reverse().join(",");
  }

  function formatWithCommas(value) {
    var decimalPointSplit = value.toString().split(".");
    decimalPointSplit[0] = decimalPointSplit[0].replace(/\w+$/g, addCommas);
    return decimalPointSplit.join(".");
  }
  function toEngineering(value) {
    var exponentOffset = value.exponent % 3;
    return Decimal__default["default"].fromMantissaExponent_noNormalize(value.mantissa * Math.pow(10, exponentOffset), value.exponent - exponentOffset);
  }
  var STANDARD_ABBREVIATIONS = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"];
  var STANDARD_PREFIXES = [["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]];
  var STANDARD_PREFIXES_2 = ["", "MI-", "MC-", "NA-", "PC-", "FM-", "AT-", "ZP-"];
  function abbreviateStandard(rawExp) {
    var exp = rawExp - 1;

    if (exp === -1) {
      return "";
    }

    if (exp < STANDARD_ABBREVIATIONS.length) {
      return STANDARD_ABBREVIATIONS[exp];
    }

    var prefix = [];
    var e = exp;

    while (e > 0) {
      prefix.push(STANDARD_PREFIXES[prefix.length % 3][e % 10]);
      e = Math.floor(e / 10);
    }

    while (prefix.length % 3 !== 0) {
      prefix.push("");
    }

    var abbreviation = "";

    for (var i = prefix.length / 3 - 1; i >= 0; i--) {
      abbreviation += prefix.slice(i * 3, i * 3 + 3).join("") + STANDARD_PREFIXES_2[i];
    }

    return abbreviation.replace(/-[A-Z]{2}-/g, "-").replace(/U([A-Z]{2}-)/g, "$1").replace(/-$/, "");
  }
  function noSpecialFormatting(exponent) {
    return exponent < Settings.exponentCommas.min;
  }
  function showCommas(exponent) {
    return Settings.exponentCommas.show && exponent < Settings.exponentCommas.max;
  }
  function isExponentFullyShown(exponent) {
    return noSpecialFormatting(exponent) || showCommas(exponent);
  }
  function formatMantissaWithExponent(mantissaFormatting, exponentFormatting, base, steps, useLogIfExponentIsFormatted, separator, forcePositiveExponent) {
    if (separator === void 0) {
      separator = "e";
    }

    if (forcePositiveExponent === void 0) {
      forcePositiveExponent = false;
    }

    return function (n, precision, precisionExponent) {
      var realBase = Math.pow(base, steps);
      var exponent = Math.floor(n.log(realBase)) * steps;

      if (forcePositiveExponent) {
        exponent = Math.max(exponent, 0);
      }

      var mantissa = n.div(Decimal__default["default"].pow(base, exponent)).toNumber();

      if (!(1 <= mantissa && mantissa < realBase)) {
        var adjust = Math.floor(Math.log(mantissa) / Math.log(realBase));
        mantissa /= Math.pow(realBase, adjust);
        exponent += steps * adjust;
      }

      var m = mantissaFormatting(mantissa, precision);

      if (m === mantissaFormatting(realBase, precision)) {
        m = mantissaFormatting(1, precision);
        exponent += steps;
      }

      if (exponent === 0) {
        return m;
      }

      var e = exponentFormatting(exponent, precisionExponent);

      if (useLogIfExponentIsFormatted && !isExponentFullyShown(exponent)) {
        m = "";
      }

      return "".concat(m).concat(separator).concat(e);
    };
  }
  function formatMantissaBaseTen(n, precision) {
    return n.toFixed(Math.max(0, precision));
  }
  function formatMantissa(base, digits) {
    return function (n, precision) {
      var value = Math.round(n * Math.pow(base, Math.max(0, precision)));
      var d = [];

      while (value > 0 || d.length === 0) {
        d.push(digits[value % base]);
        value = Math.floor(value / base);
      }

      var result = d.reverse().join("");

      if (precision > 0) {
        result = result.padStart(precision + 1, "0");
        result = "".concat(result.slice(0, -precision), ".").concat(result.slice(-precision));
      }

      return result;
    };
  }

  var Notation = function () {
    function Notation() {}

    Notation.prototype.format = function (value, places, placesUnder1000, placesExponent) {
      if (places === void 0) {
        places = 0;
      }

      if (placesUnder1000 === void 0) {
        placesUnder1000 = 0;
      }

      if (placesExponent === void 0) {
        placesExponent = places;
      }

      if (typeof value === "number" && !Number.isFinite(value)) {
        return this.infinite;
      }

      var decimal = Decimal__default["default"].fromValue_noAlloc(value);

      if (decimal.exponent < -300) {
        return decimal.sign() < 0 ? this.formatVerySmallNegativeDecimal(decimal.abs(), placesUnder1000) : this.formatVerySmallDecimal(decimal, placesUnder1000);
      }

      if (decimal.exponent < 3) {
        var number = decimal.toNumber();
        return number < 0 ? this.formatNegativeUnder1000(Math.abs(number), placesUnder1000) : this.formatUnder1000(number, placesUnder1000);
      }

      if (Settings.isInfinite(decimal.abs())) {
        return decimal.sign() < 0 ? this.negativeInfinite : this.infinite;
      }

      return decimal.sign() < 0 ? this.formatNegativeDecimal(decimal.abs(), places, placesExponent) : this.formatDecimal(decimal, places, placesExponent);
    };

    Object.defineProperty(Notation.prototype, "negativeInfinite", {
      get: function get() {
        return "-".concat(this.infinite);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Notation.prototype, "infinite", {
      get: function get() {
        return "Infinite";
      },
      enumerable: false,
      configurable: true
    });

    Notation.prototype.formatVerySmallNegativeDecimal = function (value, places) {
      return "-".concat(this.formatVerySmallDecimal(value, places));
    };

    Notation.prototype.formatVerySmallDecimal = function (value, places) {
      return this.formatUnder1000(value.toNumber(), places);
    };

    Notation.prototype.formatNegativeUnder1000 = function (value, places) {
      return "-".concat(this.formatUnder1000(value, places));
    };

    Notation.prototype.formatUnder1000 = function (value, places) {
      return value.toFixed(places);
    };

    Notation.prototype.formatNegativeDecimal = function (value, places, placesExponent) {
      return "-".concat(this.formatDecimal(value, places, placesExponent));
    };

    Notation.prototype.formatExponent = function (exponent, precision, specialFormat, largeExponentPrecision) {
      if (precision === void 0) {
        precision = Settings.exponentDefaultPlaces;
      }

      if (specialFormat === void 0) {
        specialFormat = function specialFormat(n, _) {
          return n.toString();
        };
      }

      if (largeExponentPrecision === void 0) {
        largeExponentPrecision = Math.max(2, precision);
      }

      if (noSpecialFormatting(exponent)) {
        return specialFormat(exponent, Math.max(precision, 1));
      }

      if (showCommas(exponent)) {
        return formatWithCommas(specialFormat(exponent, 0));
      }

      return this.formatDecimal(new Decimal__default["default"](exponent), largeExponentPrecision, largeExponentPrecision);
    };

    return Notation;
  }();

  var ScientificNotation = function (_super) {
    tslib.__extends(ScientificNotation, _super);

    function ScientificNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(ScientificNotation.prototype, "name", {
      get: function get() {
        return "Scientific";
      },
      enumerable: false,
      configurable: true
    });

    ScientificNotation.prototype.formatDecimal = function (value, places, placesExponent) {
      return formatMantissaWithExponent(formatMantissaBaseTen, this.formatExponent.bind(this), 10, 1, false)(value, places, placesExponent);
    };

    return ScientificNotation;
  }(Notation);

  var EngineeringNotation = function (_super) {
    tslib.__extends(EngineeringNotation, _super);

    function EngineeringNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(EngineeringNotation.prototype, "name", {
      get: function get() {
        return "Engineering";
      },
      enumerable: false,
      configurable: true
    });

    EngineeringNotation.prototype.formatDecimal = function (value, places, placesExponent) {
      return formatMantissaWithExponent(formatMantissaBaseTen, this.formatExponent.bind(this), 10, 3, false)(value, places, placesExponent);
    };

    return EngineeringNotation;
  }(Notation);

  var CustomNotation = function (_super) {
    tslib.__extends(CustomNotation, _super);

    function CustomNotation(letters, mantissaExponentSeparator, separator) {
      if (mantissaExponentSeparator === void 0) {
        mantissaExponentSeparator = "";
      }

      if (separator === void 0) {
        separator = "";
      }

      var _this = this;

      if (letters.length < 2) {
        throw new Error("The supplied letter sequence must contain at least 2 letters");
      }

      _this = _super.call(this) || this;
      _this.letters = letters;
      _this.mantissaExponentSeparator = mantissaExponentSeparator;
      _this.separator = separator;
      return _this;
    }

    Object.defineProperty(CustomNotation.prototype, "name", {
      get: function get() {
        return "Custom";
      },
      enumerable: false,
      configurable: true
    });

    CustomNotation.prototype.formatDecimal = function (value, places) {
      var engineering = toEngineering(value);
      var mantissa = engineering.mantissa.toFixed(places);
      return mantissa + this.mantissaExponentSeparator + this.transcribe(engineering.exponent).join(this.separator);
    };

    CustomNotation.prototype.transcribe = function (exponent) {
      var normalizedExponent = exponent / 3;
      var base = this.letters.length;

      if (normalizedExponent <= base) {
        return [this.letters[normalizedExponent - 1]];
      }

      var letters = [];

      while (normalizedExponent > base) {
        var remainder = normalizedExponent % base;
        var letterIndex = (remainder === 0 ? base : remainder) - 1;
        letters.push(this.letters[letterIndex]);
        normalizedExponent = (normalizedExponent - remainder) / base;

        if (remainder === 0) {
          normalizedExponent--;
        }
      }

      letters.push(this.letters[normalizedExponent - 1]);
      return letters.reverse();
    };

    return CustomNotation;
  }(EngineeringNotation);

  var LETTERS = "abcdefghijklmnopqrstuvwxyz";

  var LettersNotation = function (_super) {
    tslib.__extends(LettersNotation, _super);

    function LettersNotation() {
      return _super.call(this, LETTERS) || this;
    }

    Object.defineProperty(LettersNotation.prototype, "name", {
      get: function get() {
        return "Letters";
      },
      enumerable: false,
      configurable: true
    });
    return LettersNotation;
  }(CustomNotation);

  var EMOJI = ["😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡"];

  var EmojiNotation = function (_super) {
    tslib.__extends(EmojiNotation, _super);

    function EmojiNotation() {
      return _super.call(this, EMOJI) || this;
    }

    Object.defineProperty(EmojiNotation.prototype, "name", {
      get: function get() {
        return "Emoji";
      },
      enumerable: false,
      configurable: true
    });
    return EmojiNotation;
  }(CustomNotation);

  var StandardNotation = function (_super) {
    tslib.__extends(StandardNotation, _super);

    function StandardNotation() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.name = "Standard";
      return _this;
    }

    StandardNotation.prototype.formatDecimal = function (value, places, placesExponent) {
      return formatMantissaWithExponent(formatMantissaBaseTen, abbreviateStandard, 1000, 1, false, " ", true)(value, places, placesExponent);
    };

    return StandardNotation;
  }(Notation);

  var standard$1 = new StandardNotation();

  var MixedScientificNotation = function (_super) {
    tslib.__extends(MixedScientificNotation, _super);

    function MixedScientificNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(MixedScientificNotation.prototype, "name", {
      get: function get() {
        return "Mixed scientific";
      },
      enumerable: false,
      configurable: true
    });

    MixedScientificNotation.prototype.formatDecimal = function (value, places, placesExponent) {
      if (value.exponent < 33) {
        return standard$1.formatDecimal(value, places, placesExponent);
      }

      return formatMantissaWithExponent(formatMantissaBaseTen, this.formatExponent.bind(this), 10, 1, false)(value, places, placesExponent);
    };

    return MixedScientificNotation;
  }(Notation);

  var standard = new StandardNotation();

  var MixedEngineeringNotation = function (_super) {
    tslib.__extends(MixedEngineeringNotation, _super);

    function MixedEngineeringNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(MixedEngineeringNotation.prototype, "name", {
      get: function get() {
        return "Mixed engineering";
      },
      enumerable: false,
      configurable: true
    });

    MixedEngineeringNotation.prototype.formatDecimal = function (value, places, placesExponent) {
      if (value.exponent < 33) {
        return standard.formatDecimal(value, places, placesExponent);
      }

      return formatMantissaWithExponent(formatMantissaBaseTen, this.formatExponent.bind(this), 10, 3, false)(value, places, placesExponent);
    };

    return MixedEngineeringNotation;
  }(Notation);

  var LogarithmNotation = function (_super) {
    tslib.__extends(LogarithmNotation, _super);

    function LogarithmNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(LogarithmNotation.prototype, "name", {
      get: function get() {
        return "Logarithm";
      },
      enumerable: false,
      configurable: true
    });

    LogarithmNotation.prototype.formatDecimal = function (value, places, placesExponent) {
      var log10 = value.log10();
      return "e".concat(this.formatExponent(log10, places, function (n, p) {
        return n.toFixed(p);
      }, placesExponent));
    };

    return LogarithmNotation;
  }(Notation);

  var BracketsNotation = function (_super) {
    tslib.__extends(BracketsNotation, _super);

    function BracketsNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(BracketsNotation.prototype, "name", {
      get: function get() {
        return "Brackets";
      },
      enumerable: false,
      configurable: true
    });

    BracketsNotation.prototype.formatDecimal = function (value) {
      var table = [")", "[", "{", "]", "(", "}"];
      var log6 = Math.LN10 / Math.log(6) * value.log10();
      var wholePartOfLog = Math.floor(log6);
      var decimalPartOfLog = log6 - wholePartOfLog;
      var decimalPartTimes36 = Math.floor(decimalPartOfLog * 36);
      var string = "";

      while (wholePartOfLog >= 6) {
        var remainder = wholePartOfLog % 6;
        wholePartOfLog -= remainder;
        wholePartOfLog /= 6;
        string = table[remainder] + string;
      }

      string = "e".concat(table[wholePartOfLog]).concat(string, ".");
      string += table[Math.floor(decimalPartTimes36 / 6)];
      string += table[decimalPartTimes36 % 6];
      return string;
    };

    return BracketsNotation;
  }(Notation);

  var LOG10_MAX_VALUE = Math.log10(Number.MAX_VALUE);

  var InfinityNotation = function (_super) {
    tslib.__extends(InfinityNotation, _super);

    function InfinityNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(InfinityNotation.prototype, "name", {
      get: function get() {
        return "Infinity";
      },
      enumerable: false,
      configurable: true
    });

    InfinityNotation.prototype.formatDecimal = function (value, places) {
      var log10 = value.log10();
      var infinities = log10 / LOG10_MAX_VALUE;
      var infPlaces = infinities < 1000 ? 4 : 3;
      var formatted = infinities.toFixed(Math.max(infPlaces, places));

      if (Settings.exponentCommas.show) {
        return "".concat(formatWithCommas(formatted), "\u221E");
      }

      return "".concat(formatted, "\u221E");
    };

    return InfinityNotation;
  }(Notation);

  var ROMAN_NUMBERS = [[1000000, "M̄"], [900000, "C̄M̄"], [500000, "D̄"], [400000, "C̄D̄"], [100000, "C̄"], [90000, "X̄C̄"], [50000, "L̄"], [40000, "X̄L̄"], [10000, "X̄"], [9000, "ⅯX̄"], [5000, "V̄"], [4000, "ⅯV̄"], [1000, "Ⅿ"], [900, "ⅭⅯ"], [500, "Ⅾ"], [400, "ⅭⅮ"], [100, "Ⅽ"], [90, "ⅩⅭ"], [50, "Ⅼ"], [40, "ⅩⅬ"], [10, "Ⅹ"], [9, "ⅠⅩ"], [5, "Ⅴ"], [4, "ⅠⅤ"], [1, "Ⅰ"]];
  var ROMAN_FRACTIONS = ["", "·", ":", "∴", "∷", "⁙"];
  var MAXIMUM = 4000000;
  var MAX_LOG_10 = Math.log10(MAXIMUM);

  var RomanNotation = function (_super) {
    tslib.__extends(RomanNotation, _super);

    function RomanNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(RomanNotation.prototype, "name", {
      get: function get() {
        return "Roman";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(RomanNotation.prototype, "infinite", {
      get: function get() {
        return "Infinitus";
      },
      enumerable: false,
      configurable: true
    });

    RomanNotation.prototype.formatUnder1000 = function (value) {
      return this.romanize(value);
    };

    RomanNotation.prototype.formatDecimal = function (value) {
      if (value.lt(MAXIMUM)) {
        return this.romanize(value.toNumber());
      }

      var log10 = value.log10();
      var maximums = log10 / MAX_LOG_10;
      var current = Math.pow(MAXIMUM, maximums - Math.floor(maximums));
      return "".concat(this.romanize(current), "\u2191").concat(this.formatDecimal(new Decimal__default["default"](maximums)));
    };

    RomanNotation.prototype.romanize = function (value) {
      var romanized = "";

      for (var _i = 0, ROMAN_NUMBERS_1 = ROMAN_NUMBERS; _i < ROMAN_NUMBERS_1.length; _i++) {
        var numberPair = ROMAN_NUMBERS_1[_i];
        var decimal = numberPair[0];
        var roman = numberPair[1];

        while (decimal <= value) {
          romanized += roman;
          value -= decimal;
        }
      }

      var duodecimal = Math.round(Math.floor(value * 10) * 1.2);

      if (duodecimal === 0) {
        return romanized === "" ? "nulla" : romanized;
      }

      if (duodecimal > 5) {
        duodecimal -= 6;
        romanized += "Ｓ";
      }

      romanized += ROMAN_FRACTIONS[duodecimal];
      return romanized;
    };

    return RomanNotation;
  }(Notation);

  var DOT_DIGITS = "⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿" + "⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿" + "⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿" + "⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿";

  var DotsNotation = function (_super) {
    tslib.__extends(DotsNotation, _super);

    function DotsNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(DotsNotation.prototype, "name", {
      get: function get() {
        return "Dots";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DotsNotation.prototype, "infinite", {
      get: function get() {
        return "⣿⠀⣿";
      },
      enumerable: false,
      configurable: true
    });

    DotsNotation.prototype.formatUnder1000 = function (value) {
      return this.dotify(value * 254);
    };

    DotsNotation.prototype.formatDecimal = function (value) {
      if (value.lt(16387063.9980315)) {
        return this.dotify(value.toNumber() * 254);
      }

      var log = value.log(254);
      var exponent = Math.floor(log - 2);
      var mantissa = Math.pow(254, log - exponent);
      return "".concat(this.dotify(exponent), "\u28FF").concat(this.dotify(mantissa * 254));
    };

    DotsNotation.prototype.dotify = function (rawValue, pad) {
      if (pad === void 0) {
        pad = false;
      }

      var value = Math.round(rawValue);

      if (!pad && value < 254) {
        return DOT_DIGITS[value + 1];
      }

      if (value < 64516) {
        return DOT_DIGITS[Math.floor(value / 254) + 1] + DOT_DIGITS[value % 254 + 1];
      }

      return this.dotify(Math.floor(value / 64516)) + this.dotify(value % 64516, true);
    };

    return DotsNotation;
  }(Notation);

  var ZALGO_CHARS = ["\u030D", "\u0336", "\u0353", "\u033F", "\u0489", "\u0330", "\u031A", "\u0338", "\u035A", "\u0337"];
  var HE_COMES = ["H", "E", " ", "C", "O", "M", "E", "S"];

  function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  var ZalgoNotation = function (_super) {
    tslib.__extends(ZalgoNotation, _super);

    function ZalgoNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(ZalgoNotation.prototype, "name", {
      get: function get() {
        return "Zalgo";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ZalgoNotation.prototype, "infinite", {
      get: function get() {
        return HE_COMES.map(function (_char) {
          return _char + randomElement(ZALGO_CHARS);
        }).join("");
      },
      enumerable: false,
      configurable: true
    });

    ZalgoNotation.prototype.formatUnder1000 = function (value) {
      return this.heComes(new Decimal__default["default"](value));
    };

    ZalgoNotation.prototype.formatDecimal = function (value) {
      return this.heComes(value);
    };

    ZalgoNotation.prototype.heComes = function (value) {
      var scaled = value.plus(1).log10() / 66666 * 1000;
      var displayPart = Number(scaled.toFixed(2));
      var zalgoPart = Math.floor(Math.abs(Math.pow(2, 30) * (scaled - displayPart)));
      var displayChars = Array.from(formatWithCommas(displayPart));
      var zalgoIndices = Array.from(zalgoPart.toString() + scaled.toFixed(0));

      for (var i = 0; i < zalgoIndices.length; i++) {
        var zalgoIndex = parseInt(zalgoIndices[i], 10);
        var displayIndex = 37 * i % displayChars.length;
        displayChars[displayIndex] += ZALGO_CHARS[zalgoIndex];
      }

      return displayChars.join("");
    };

    return ZalgoNotation;
  }(Notation);

  var SIGNS = {
    positive: 0,
    negative: 1
  };

  var HexNotation = function (_super) {
    tslib.__extends(HexNotation, _super);

    function HexNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(HexNotation.prototype, "name", {
      get: function get() {
        return "Hex";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(HexNotation.prototype, "negativeInfinite", {
      get: function get() {
        return "00000000";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(HexNotation.prototype, "infinite", {
      get: function get() {
        return "FFFFFFFF";
      },
      enumerable: false,
      configurable: true
    });

    HexNotation.prototype.formatVerySmallNegativeDecimal = function (value) {
      return this.formatDecimal(value.negate());
    };

    HexNotation.prototype.formatVerySmallDecimal = function (value) {
      return this.formatDecimal(value);
    };

    HexNotation.prototype.formatNegativeUnder1000 = function (value) {
      return this.formatDecimal(new Decimal__default["default"](-value));
    };

    HexNotation.prototype.formatUnder1000 = function (value) {
      return this.formatDecimal(new Decimal__default["default"](value));
    };

    HexNotation.prototype.formatNegativeDecimal = function (value) {
      return this.formatDecimal(value.negate());
    };

    HexNotation.prototype.formatDecimal = function (value) {
      return this.rawValue(value, 32).toString(16).toUpperCase().padStart(8, "0");
    };

    HexNotation.prototype.modifiedLogarithm = function (x) {
      var floorOfLog = Math.floor(Decimal__default["default"].log2(x));
      var previousPowerOfTwo = Decimal__default["default"].pow(2, floorOfLog);
      var fractionToNextPowerOfTwo = Decimal__default["default"].div(x, previousPowerOfTwo).toNumber() - 1;
      return floorOfLog + fractionToNextPowerOfTwo;
    };

    HexNotation.prototype.isFinite = function (x) {
      if (typeof x === "number") {
        return isFinite(x);
      }

      return isFinite(x.e) && isFinite(x.mantissa);
    };

    HexNotation.prototype.rawValue = function (inputValue, numberOfBits) {
      var value = inputValue;
      var signs = [];

      for (var i = 0; i < numberOfBits; i++) {
        if (!this.isFinite(value)) {
          break;
        }

        if (Decimal__default["default"].lt(value, 0)) {
          signs.push(SIGNS.negative);
          value = -this.modifiedLogarithm(Decimal__default["default"].times(value, -1));
        } else {
          signs.push(SIGNS.positive);
          value = this.modifiedLogarithm(value);
        }
      }

      var resultValue = parseInt(signs.map(function (x) {
        return x === SIGNS.positive ? 1 : 0;
      }).join("").padEnd(numberOfBits, "0"), 2);

      if (resultValue !== Math.pow(2, numberOfBits) - 1 && (value > 0 || value === 0 && resultValue % 2 === 1)) {
        resultValue += 1;
      }

      return resultValue;
    };

    return HexNotation;
  }(Notation);

  var VOLUME_UNITS = [[0, "pL", 0], [61611520, "minim", 0], [61611520 * 60, "dram", 1], [61611520 * 60 * 8, "ounce", 2], [61611520 * 60 * 8 * 4, "gill", 2], [61611520 * 60 * 8 * 4 * 2, "cup", 3], [61611520 * 60 * 8 * 4 * 2 * 2, "pint", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2, "quart", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4, "gallon", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 4.5, "pin", 3], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 9, "firkin", 3], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 18, "kilderkin", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 36, "barrel", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 54, "hogshead", 5], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 72, "puncheon", 6], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 108, "butt", 7], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 216, "tun", 7]];
  var MINIMS = VOLUME_UNITS[1];
  var VOLUME_ADJECTIVES = ["minute ", "tiny ", "petite ", "small ", "modest ", "medium ", "generous ", "large ", "great ", "grand ", "huge ", "gigantic ", "immense ", "colossal ", "vast ", "galactic ", "cosmic ", "infinite ", "eternal "];
  var VOWELS = new Set("aeiouAEIOU");
  var MAX_VOLUME = 10 * VOLUME_UNITS[VOLUME_UNITS.length - 1][0];
  var LOG_MAX_VOLUME = Math.log10(MAX_VOLUME);
  var REDUCE_RATIO = Math.log10(MAX_VOLUME / MINIMS[0]);

  var ImperialNotation = function (_super) {
    tslib.__extends(ImperialNotation, _super);

    function ImperialNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(ImperialNotation.prototype, "name", {
      get: function get() {
        return "Imperial";
      },
      enumerable: false,
      configurable: true
    });

    ImperialNotation.prototype.formatUnder1000 = function (value) {
      return this.formatDecimal(new Decimal__default["default"](value));
    };

    ImperialNotation.prototype.formatDecimal = function (value) {
      if (value.lt(MAX_VOLUME)) {
        return this.convertToVolume(value.toNumber(), VOLUME_ADJECTIVES[0]);
      }

      var logValue = value.log10() - LOG_MAX_VOLUME;
      var adjectiveIndex = 1;

      while (logValue > REDUCE_RATIO) {
        adjectiveIndex++;
        logValue /= REDUCE_RATIO;
      }

      return this.convertToVolume(Math.pow(10, logValue) * MINIMS[0], VOLUME_ADJECTIVES[adjectiveIndex]);
    };

    ImperialNotation.prototype.convertToVolume = function (x, adjective) {
      var volIdx = this.findVolumeUnit(x);

      if (volIdx === 0) {
        return this.formatMetric(x);
      }

      var smallStr = this.checkSmallUnits(adjective, x, volIdx);

      if (smallStr !== undefined) {
        return smallStr;
      }

      var big = VOLUME_UNITS[volIdx];
      var numBig = Math.floor(x / big[0]);
      var remainder = x - numBig * big[0];

      if (volIdx < VOLUME_UNITS.length - 1) {
        var volume = this.checkAlmost(adjective, x, 0, volIdx + 1);

        if (volume !== undefined) {
          return volume;
        }
      }

      var nearMultiple = this.checkAlmost(adjective, remainder, numBig, volIdx);

      if (nearMultiple !== undefined) {
        return nearMultiple;
      }

      if (remainder < VOLUME_UNITS[volIdx - big[2]][0]) {
        return this.pluralOrArticle(numBig, adjective + big[1]);
      }

      var numBest = Math.floor(remainder / VOLUME_UNITS[volIdx - 1][0]);
      var bestUnitIndex = volIdx - 1;
      var bestUnitError = remainder - numBest * VOLUME_UNITS[volIdx - 1][0];

      for (var thirdUnitIndex = volIdx - 2; thirdUnitIndex > 0 && thirdUnitIndex > volIdx - big[2]; --thirdUnitIndex) {
        var third = VOLUME_UNITS[thirdUnitIndex];
        var numThird = Math.floor(remainder / third[0]);

        if (numThird > 9 && thirdUnitIndex !== 1) {
          break;
        }

        var thirdUnitError = remainder - numThird * third[0];

        if (thirdUnitError < 0.99 * bestUnitError) {
          numBest = numThird;
          bestUnitIndex = thirdUnitIndex;
          bestUnitError = thirdUnitError;
        }
      }

      return this.bigAndSmall(adjective, numBig, big, numBest, VOLUME_UNITS[bestUnitIndex]);
    };

    ImperialNotation.prototype.formatMetric = function (x) {
      if (x < 1000) {
        return "".concat(x < 10 || x === Math.round(x) ? x.toFixed(2) : x.toFixed(0), "pL");
      }

      if (x < 1e6) {
        return "".concat((x / 1000).toPrecision(4), "nL");
      }

      return "".concat((x / 1e6).toPrecision(4), "\u03BCL");
    };

    ImperialNotation.prototype.checkSmallUnits = function (adjective, x, volIdx) {
      var big = VOLUME_UNITS[volIdx];

      if (volIdx <= 3 && x + 9.5 * MINIMS[0] > VOLUME_UNITS[volIdx + 1][0]) {
        return this.almostOrShortOf(x, adjective, 1, VOLUME_UNITS[volIdx + 1], MINIMS);
      }

      if (volIdx === 1) {
        var deciMinims = Math.round(x * 10 / big[0]);

        if (deciMinims === 10) {
          return this.addArticle(adjective + big[1]);
        }

        var places = deciMinims < 100 ? 1 : 0;
        return "".concat((deciMinims / 10).toFixed(places), " ").concat(adjective).concat(big[1], "s");
      }

      if (volIdx === 2) {
        var numBig = Math.floor(x / big[0]);
        var remainder = x - numBig * big[0];

        if (remainder > 50.5 * MINIMS[0]) {
          return this.almostOrShortOf(x, adjective, numBig + 1, big, MINIMS);
        }

        var numSmall = Math.round(remainder / MINIMS[0]);
        return this.bigAndSmall(adjective, numBig, big, numSmall, MINIMS);
      }

      return undefined;
    };

    ImperialNotation.prototype.findVolumeUnit = function (x) {
      var low = 0;
      var high = VOLUME_UNITS.length;
      var guess = 0;

      while (high - low > 1) {
        guess = Math.floor((low + high) / 2);

        if (VOLUME_UNITS[guess][0] > x) {
          high = guess;
        } else {
          low = guess;
        }
      }

      return low;
    };

    ImperialNotation.prototype.checkAlmost = function (adjective, x, numBig, bigIndex) {
      var big = VOLUME_UNITS[bigIndex];

      if (x + VOLUME_UNITS[bigIndex - big[2]][0] >= big[0]) {
        return this.almost(adjective, numBig + 1, big);
      }

      var small = VOLUME_UNITS[bigIndex + 1 - big[2]];

      if (x + small[0] >= big[0]) {
        return this.shortOf(adjective, numBig + 1, big, 1, small);
      }

      return undefined;
    };

    ImperialNotation.prototype.bigAndSmall = function (adjective, numBig, big, numSmall, small) {
      var bigStr = this.pluralOrArticle(numBig, adjective + big[1]);
      return numSmall === 0 ? bigStr : "".concat(bigStr, " and ").concat(this.pluralOrArticle(numSmall, small[1]));
    };

    ImperialNotation.prototype.almost = function (adjective, numBig, big) {
      return "almost ".concat(this.pluralOrArticle(numBig, adjective + big[1]));
    };

    ImperialNotation.prototype.almostOrShortOf = function (x, adjective, numBig, big, small) {
      var _short = Math.round((numBig * big[0] - x) / small[0]);

      return _short === 0 ? this.almost(adjective, numBig, big) : this.shortOf(adjective, numBig, big, _short, small);
    };

    ImperialNotation.prototype.shortOf = function (adjective, numBig, big, numSmall, small) {
      return "".concat(this.pluralOrArticle(numSmall, small[1]), " short of ").concat(this.pluralOrArticle(numBig, adjective + big[1]));
    };

    ImperialNotation.prototype.pluralOrArticle = function (num, str) {
      return num === 1 ? this.addArticle(str) : "".concat(num, " ").concat(str, "s");
    };

    ImperialNotation.prototype.addArticle = function (x) {
      return (VOWELS.has(x[0]) ? "an " : "a ") + x;
    };

    return ImperialNotation;
  }(Notation);

  var HOURS = ["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"];
  var LOG12 = Math.log10(12);

  var ClockNotation = function (_super) {
    tslib.__extends(ClockNotation, _super);

    function ClockNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(ClockNotation.prototype, "name", {
      get: function get() {
        return "Clock";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ClockNotation.prototype, "infinite", {
      get: function get() {
        return "🕛🕡";
      },
      enumerable: false,
      configurable: true
    });

    ClockNotation.prototype.formatUnder1000 = function (value) {
      return this.clockwise(new Decimal__default["default"](value));
    };

    ClockNotation.prototype.formatDecimal = function (value) {
      return this.clockwise(value);
    };

    ClockNotation.prototype.clockwise = function (value) {
      if (value.lt(12)) {
        return this.hour(value.toNumber());
      }

      var log = value.log10() / LOG12;
      var exponent = Math.floor(log);

      if (log < 301) {
        var clockLow = (Math.pow(12, log - exponent + 1) - 12) / 11;

        if (exponent < 13) {
          return this.hour(exponent - 1) + this.hour(clockLow);
        }

        exponent -= 13;
        var prefix = "";

        if (exponent >= 144) {
          prefix = this.hour(0);
          exponent -= 144;
        }

        return prefix + this.hour(exponent / 12) + this.hour(exponent % 12) + this.hour(clockLow);
      }

      exponent -= 301;
      var clockHigh = 1;

      while (exponent >= 1728) {
        exponent = (exponent - 1728) / 12;
        ++clockHigh;
      }

      return this.hour(clockHigh) + this.hour(exponent / 144) + this.hour(exponent % 144 / 12) + this.hour(exponent % 12);
    };

    ClockNotation.prototype.hour = function (number) {
      return HOURS[Math.max(Math.min(Math.floor(number), 11), 0)];
    };

    return ClockNotation;
  }(Notation);

  var MAX_INT = 10006;
  var MAX_INT_DECIMAL = new Decimal__default["default"](MAX_INT);
  var MAX_INT_LOG_10 = Math.log10(MAX_INT);
  var PRIMES = [];
  var visitedMarks = new Array(MAX_INT).fill(false);
  var sieveLimit = Math.ceil(Math.sqrt(MAX_INT));

  for (var number = 2; number < sieveLimit; number++) {
    if (visitedMarks[number]) {
      continue;
    }

    PRIMES.push(number);

    for (var mark = number; mark <= MAX_INT; mark += number) {
      visitedMarks[mark] = true;
    }
  }

  for (var number = sieveLimit; number < MAX_INT; number++) {
    if (!visitedMarks[number]) {
      PRIMES.push(number);
    }
  }

  var LAST_PRIME_INDEX = PRIMES.length - 1;
  var MAX_PRIME = PRIMES[LAST_PRIME_INDEX];
  var EXPONENT_CHARACTERS = ["\u2070", "\xB9", "\xB2", "\xB3", "\u2074", "\u2075", "\u2076", "\u2077", "\u2078", "\u2079", "\xB9\u2070", "\xB9\xB9", "\xB9\xB2", "\xB9\xB3"];

  var PrimeNotation = function (_super) {
    tslib.__extends(PrimeNotation, _super);

    function PrimeNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(PrimeNotation.prototype, "name", {
      get: function get() {
        return "Prime";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(PrimeNotation.prototype, "infinite", {
      get: function get() {
        return "Primefinity?";
      },
      enumerable: false,
      configurable: true
    });

    PrimeNotation.prototype.formatUnder1000 = function (value) {
      return this.primify(new Decimal__default["default"](value));
    };

    PrimeNotation.prototype.formatDecimal = function (value) {
      return this.primify(value);
    };

    PrimeNotation.prototype.primify = function (value) {
      if (value.lte(MAX_INT_DECIMAL)) {
        var floored = Math.floor(value.toNumber());

        if (floored === 0) {
          return "0";
        }

        if (floored === 1) {
          return "1";
        }

        return this.formatFromList(this.primesFromInt(floored));
      }

      var exp = value.log10() / MAX_INT_LOG_10;
      var base = Math.pow(MAX_INT, exp / Math.ceil(exp));

      if (exp <= MAX_INT) {
        return this.formatBaseExp(base, exp);
      }

      var exp2 = Math.log10(exp) / Math.log10(MAX_INT);
      var exp2Ceil = Math.ceil(exp2);
      exp = Math.pow(MAX_INT, exp2 / exp2Ceil);
      base = Math.pow(MAX_INT, exp / Math.ceil(exp));
      var exp2List = this.primesFromInt(exp2Ceil);
      var formatedExp2 = exp2List.length === 1 ? EXPONENT_CHARACTERS[exp2List[0]] : "^(".concat(this.formatFromList(exp2List), ")");
      return this.formatBaseExp(base, exp) + formatedExp2;
    };

    PrimeNotation.prototype.formatBaseExp = function (base, exp) {
      var formatedBase = this.formatFromList(this.primesFromInt(Math.floor(base)));
      var formatedExp = this.formatFromList(this.primesFromInt(Math.ceil(exp)));
      return "(".concat(formatedBase, ")^(").concat(formatedExp, ")");
    };

    PrimeNotation.prototype.formatFromList = function (list) {
      var out = [];
      var last = 0;
      var count = 0;

      for (var i = 0; i < list.length; i++) {
        if (list[i] === last) {
          count++;
        } else {
          if (last > 0) {
            if (count > 1) {
              out.push("".concat(last).concat(EXPONENT_CHARACTERS[count]));
            } else {
              out.push(last);
            }
          }

          last = list[i];
          count = 1;
        }

        if (i === list.length - 1) {
          if (count > 1) {
            out.push("".concat(list[i]).concat(EXPONENT_CHARACTERS[count]));
          } else {
            out.push(list[i]);
          }
        }
      }

      return out.join("\xD7");
    };

    PrimeNotation.prototype.findGreatestLtePrimeIndex = function (value) {
      if (value >= MAX_PRIME) {
        return LAST_PRIME_INDEX;
      }

      var min = 0;
      var max = LAST_PRIME_INDEX;

      while (max !== min + 1) {
        var middle = Math.floor((max + min) / 2);
        var prime = PRIMES[middle];

        if (prime === value) {
          return middle;
        }

        if (value < prime) {
          max = middle;
        } else {
          min = middle;
        }
      }

      return min;
    };

    PrimeNotation.prototype.primesFromInt = function (value) {
      var factors = [];
      var factoringValue = value;

      while (factoringValue !== 1) {
        var ltePrimeIndex = this.findGreatestLtePrimeIndex(factoringValue);
        var ltePrime = PRIMES[ltePrimeIndex];

        if (ltePrime === factoringValue) {
          factors.push(factoringValue);
          break;
        }

        var halfFactoring = factoringValue / 2;
        var primeIndex = this.findGreatestLtePrimeIndex(halfFactoring);
        var factor = void 0;

        while (factor === undefined) {
          var prime = PRIMES[primeIndex--];

          if (factoringValue % prime === 0) {
            factor = prime;
          }
        }

        factoringValue /= factor;
        factors.push(factor);
      }

      return factors.reverse();
    };

    return PrimeNotation;
  }(Notation);

  var BARS = ["", "", "", "", "", "", "", ""];
  var NEGATIVE_BARS = ["", "", "", "", "", "", "", ""];
  var LOG8 = Math.log(8);

  var BarNotation = function (_super) {
    tslib.__extends(BarNotation, _super);

    function BarNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(BarNotation.prototype, "name", {
      get: function get() {
        return "Bar";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BarNotation.prototype, "negativeInfinite", {
      get: function get() {
        return "";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BarNotation.prototype, "infinite", {
      get: function get() {
        return "";
      },
      enumerable: false,
      configurable: true
    });

    BarNotation.prototype.formatVerySmallNegativeDecimal = function (value) {
      return this.flipBars(this.formatDecimal(value));
    };

    BarNotation.prototype.formatVerySmallDecimal = function (value) {
      return this.formatDecimal(value);
    };

    BarNotation.prototype.formatNegativeUnder1000 = function (value) {
      return this.flipBars(this.formatDecimal(new Decimal__default["default"](value)));
    };

    BarNotation.prototype.formatUnder1000 = function (value) {
      return this.formatDecimal(new Decimal__default["default"](value));
    };

    BarNotation.prototype.formatNegativeDecimal = function (value) {
      return this.flipBars(this.formatDecimal(value));
    };

    BarNotation.prototype.formatDecimal = function (value) {
      if (value.eq(0)) {
        return "0";
      }

      if (value.lessThan(1) && value.greaterThan(0)) {
        return "/".concat(this.formatDecimal(Decimal__default["default"].div(1, value)));
      }

      var log8 = Math.LN10 / LOG8 * value.log10();
      var wholeLog = Math.floor(log8);
      var decimalLog = log8 - wholeLog;
      var decimalLog64 = Math.floor(decimalLog * 64);
      var parts = [BARS[decimalLog64 % 8], BARS[Math.floor(decimalLog64 / 8)]];

      while (wholeLog >= 8) {
        var remainder = wholeLog % 8;
        wholeLog = (wholeLog - remainder) / 8;
        parts.push(BARS[remainder]);
      }

      parts.push(BARS[wholeLog]);
      return parts.join("");
    };

    BarNotation.prototype.flipBars = function (parts) {
      var newParts = [];

      for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        newParts.push(NEGATIVE_BARS[BARS.indexOf(part)]);
      }

      return newParts.join("");
    };

    return BarNotation;
  }(Notation);

  var SHI = "世使侍勢十史嗜士始室實屍市恃拭拾施是時氏濕獅矢石視試詩誓識逝適釋食";

  var ShiNotation = function (_super) {
    tslib.__extends(ShiNotation, _super);

    function ShiNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(ShiNotation.prototype, "name", {
      get: function get() {
        return "Shi";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ShiNotation.prototype, "infinite", {
      get: function get() {
        return this.shi(Decimal__default["default"].NUMBER_MAX_VALUE);
      },
      enumerable: false,
      configurable: true
    });

    ShiNotation.prototype.formatUnder1000 = function (value) {
      return this.shi(new Decimal__default["default"](value));
    };

    ShiNotation.prototype.formatDecimal = function (value) {
      return this.shi(value);
    };

    ShiNotation.prototype.getShiCharacter = function (x) {
      return SHI[Math.floor(x) % SHI.length];
    };

    ShiNotation.prototype.shi = function (value) {
      var scaled = Math.pow(value.plus(1).log10() * 1000, 0.08);
      var shi = "";

      for (var i = 0; i < 3; i++) {
        shi += this.getShiCharacter(scaled * Math.pow(SHI.length, i));
      }

      return shi;
    };

    return ShiNotation;
  }(Notation);

  var _a;
  var LEN = 23;
  var START = "\uE010";
  var START_HEX = (_a = START.codePointAt(0)) !== null && _a !== void 0 ? _a : 65;
  var INFINITY = "\uE027";
  var NEGATIVE = "\uE028";
  var BLOBS = [];

  for (var i = 0; i < LEN; i++) {
    var _char = String.fromCharCode(START_HEX + i);

    BLOBS.push(_char);
  }

  var LOG3 = Math.log10(3);

  var BlobsNotation = function (_super) {
    tslib.__extends(BlobsNotation, _super);

    function BlobsNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(BlobsNotation.prototype, "name", {
      get: function get() {
        return "Blobs";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BlobsNotation.prototype, "infinite", {
      get: function get() {
        return "".concat(INFINITY);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BlobsNotation.prototype, "negativeInfinite", {
      get: function get() {
        return "".concat(NEGATIVE).concat(INFINITY);
      },
      enumerable: false,
      configurable: true
    });

    BlobsNotation.prototype.formatNegativeUnder1000 = function (num) {
      return "".concat(NEGATIVE).concat(this.blobify(new Decimal__default["default"](num - 1)));
    };

    BlobsNotation.prototype.formatNegativeDecimal = function (num) {
      return "".concat(NEGATIVE).concat(this.blobify(num.minus(1)));
    };

    BlobsNotation.prototype.formatUnder1000 = function (num) {
      return this.blobify(new Decimal__default["default"](num));
    };

    BlobsNotation.prototype.formatDecimal = function (num) {
      return this.blobify(num);
    };

    BlobsNotation.prototype.blobify = function (num) {
      var number = this.reduceNumber(num.abs());

      if (number < LEN) {
        return BLOBS[Math.floor(number)];
      }

      if (Math.floor(number / LEN) < LEN + 1) {
        return BLOBS[Math.floor(number / LEN) - 1] + BLOBS[Math.floor(number % LEN)];
      }

      return this.blobify(Decimal__default["default"].floor(number / LEN - 1)) + BLOBS[Math.floor(number % LEN)];
    };

    BlobsNotation.prototype.reduceNumber = function (num) {
      if (num.lte(1000)) {
        return num.toNumber();
      }

      return (Math.log10(num.log10()) - LOG3) / Math.log10(1.0002) + 1000;
    };

    return BlobsNotation;
  }(Notation);

  var BlindNotation = function (_super) {
    tslib.__extends(BlindNotation, _super);

    function BlindNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(BlindNotation.prototype, "name", {
      get: function get() {
        return "Blind";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BlindNotation.prototype, "negativeInfinite", {
      get: function get() {
        return " ";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BlindNotation.prototype, "infinite", {
      get: function get() {
        return " ";
      },
      enumerable: false,
      configurable: true
    });

    BlindNotation.prototype.formatVerySmallNegativeDecimal = function () {
      return " ";
    };

    BlindNotation.prototype.formatVerySmallDecimal = function () {
      return " ";
    };

    BlindNotation.prototype.formatNegativeUnder1000 = function () {
      return " ";
    };

    BlindNotation.prototype.formatUnder1000 = function () {
      return " ";
    };

    BlindNotation.prototype.formatNegativeDecimal = function () {
      return " ";
    };

    BlindNotation.prototype.formatDecimal = function () {
      return " ";
    };

    return BlindNotation;
  }(Notation);

  var notationList = [new ScientificNotation(), new LettersNotation(), new StandardNotation(), new LogarithmNotation(), new BracketsNotation(), new InfinityNotation(), new RomanNotation(), new DotsNotation(), new ZalgoNotation(), new HexNotation(), new ImperialNotation(), new ClockNotation(), new PrimeNotation(), new BarNotation(), new ShiNotation(), new BlobsNotation(), new BlindNotation()];

  var AllNotation = function (_super) {
    tslib.__extends(AllNotation, _super);

    function AllNotation() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Object.defineProperty(AllNotation.prototype, "name", {
      get: function get() {
        return "ALL";
      },
      enumerable: false,
      configurable: true
    });

    AllNotation.prototype.formatNegativeUnder1000 = function (value, places) {
      return this.formatDecimal(new Decimal__default["default"](-value), places);
    };

    AllNotation.prototype.formatUnder1000 = function (value, places) {
      return this.formatDecimal(new Decimal__default["default"](value), places);
    };

    AllNotation.prototype.formatNegativeDecimal = function (value, places) {
      return this.formatDecimal(new Decimal__default["default"](-value), places);
    };

    AllNotation.prototype.formatDecimal = function (value, places) {
      var index = Math.floor(Math.log2(value.abs().plus(2).log2()));
      var notation = notationList[index % notationList.length];
      return notation.format(value, places, places);
    };

    return AllNotation;
  }(Notation);

  exports.AllNotation = AllNotation;
  exports.BarNotation = BarNotation;
  exports.BlindNotation = BlindNotation;
  exports.BlobsNotation = BlobsNotation;
  exports.BracketsNotation = BracketsNotation;
  exports.ClockNotation = ClockNotation;
  exports.CustomNotation = CustomNotation;
  exports.DotsNotation = DotsNotation;
  exports.EmojiNotation = EmojiNotation;
  exports.EngineeringNotation = EngineeringNotation;
  exports.HexNotation = HexNotation;
  exports.ImperialNotation = ImperialNotation;
  exports.InfinityNotation = InfinityNotation;
  exports.LettersNotation = LettersNotation;
  exports.LogarithmNotation = LogarithmNotation;
  exports.MixedEngineeringNotation = MixedEngineeringNotation;
  exports.MixedScientificNotation = MixedScientificNotation;
  exports.Notation = Notation;
  exports.PrimeNotation = PrimeNotation;
  exports.RomanNotation = RomanNotation;
  exports.ScientificNotation = ScientificNotation;
  exports.Settings = Settings;
  exports.ShiNotation = ShiNotation;
  exports.StandardNotation = StandardNotation;
  exports.ZalgoNotation = ZalgoNotation;
  exports.abbreviateStandard = abbreviateStandard;
  exports.formatMantissa = formatMantissa;
  exports.formatMantissaBaseTen = formatMantissaBaseTen;
  exports.formatMantissaWithExponent = formatMantissaWithExponent;

  Object.defineProperty(exports, '__esModule', { value: true });
  return exports
})({}, Decimal, tslib);
