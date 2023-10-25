function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// GLOBAL CONSTANTS
var SECOND = 1000;
var MINUTE = SECOND * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var weekdays_short = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var months_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// PROTOTYPES
Date.prototype.getWeekNumber = function () {
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

// DATEPICKER
var Datepicker = /*#__PURE__*/function () {
  function Datepicker(host, s) {
    _classCallCheck(this, Datepicker);
    var t = this;
    t.host = host;
    t.frame = document.createElement("div");
    t.frame.id = "datepicker-frame";
    t.frame.className = "noselect";

    // Run config if settings present
    if (s) t.config(s);

    // Show conditions
    window.onresize = function () {
      if (t.display_state) show(true);
    }; // to update screen position
    document.addEventListener("click", function (e) {
      if (e.target == document.getElementById("datepicker") && !document.getElementById("datepicker-frame")) {
        t.load("day"); // Start date when opening
        show(true);
      } else if (document.getElementById("datepicker-frame") != null && !e.path.includes(document.getElementById("datepicker-frame"))) show(false);
    });

    // Load
    t.load = function (n) {
      while (t.frame.firstChild) t.frame.removeChild(t.frame.firstChild);
      t.head = document.createElement("ul");
      t.frame.append(t.head);
      t.table = document.createElement("table");
      t.frame.append(t.table);
      t.table.className = n;

      // If data is month
      if (n == "day") {
        // Prev
        var prev = document.createElement("li");
        t.head.append(prev);
        prev.innerHTML = "<<";
        if (t.firstdate == undefined || t.date.getMonth() > t.firstdate.getMonth() || t.date.getFullYear() > t.firstdate.getFullYear()) {
          prev.className = "pointer";
          prev.onclick = function () {
            t.date = new Date(t.date.getFullYear(), t.date.getMonth() - 1, 1);
            t.load("day");
          };
        } else prev.className = "disabled";

        // month and year
        var head = document.createElement("li");
        t.head.append(head);
        head.colSpan = 5;
        head.innerHTML = months[t.date.getMonth()] + " " + t.date.getFullYear();
        head.onclick = function () {
          t.load("month");
        };
        head.className = "pointer";

        // Next
        var next = document.createElement("li");
        t.head.append(next);
        next.innerHTML = ">>";
        if (t.lastdate == undefined || t.date.getMonth() < t.lastdate.getMonth() || t.date.getFullYear() < t.lastdate.getFullYear()) {
          next.className = "pointer";
          next.onclick = function () {
            t.date = new Date(t.date.getFullYear(), t.date.getMonth() + 1, 1);
            t.load("day");
          };
        } else next.className = "disabled";

        // Header row [Weekdays]
        var row = document.createElement("tr");
        t.table.append(row);
        for (var day = 0; day < 7; day++) {
          var cell = document.createElement("th");
          cell.innerHTML = weekdays_short[day];
          row.append(cell);
        }

        // Dates
        var first_day_in_month = new Date(t.date.getFullYear(), t.date.getMonth(), 1);
        var index = 1 - (first_day_in_month.getDay() || 7);
        for (var y = 0; y < 6; y++) {
          var tr = document.createElement("tr");
          t.table.append(tr);
          var _loop = function _loop() {
            var day = new Date(first_day_in_month.getTime());
            day.setDate(day.getDate() + index);
            var td = document.createElement("td");
            tr.append(td);
            td.innerHTML = day.getDate();
            if (day.getMonth() == t.date.getMonth() && t.disableddays(day) && (t.firstdate == undefined ? true : day.getMonth() == t.firstdate.getMonth() ? day.getFullYear() == t.firstdate.getFullYear() ? day.getDate() >= t.firstdate.getDate() : true : true) && (t.lastdate == undefined ? true : day.getMonth() == t.lastdate.getMonth() ? day.getFullYear() == t.lastdate.getFullYear() ? day.getDate() <= t.lastdate.getDate() : true : true)) {
              td.className = "pointer";
              td.onclick = function () {
                t.setDate(day);
                show(false);
              };
            } else td.className = "disabled";
            td.className += day.toDateString() == new Date().toDateString() ? " today" : "";
            index++;
          };
          for (var x = 0; x < 7; x++) {
            _loop();
          }
        }
      }

      // If data is year
      else if (n == "month") {
        // Prev
        var _prev = document.createElement("li");
        t.head.append(_prev);
        _prev.innerHTML = "<<";
        if (t.firstdate == undefined || t.date.getFullYear() > t.firstdate.getFullYear()) {
          _prev.className = "pointer";
          _prev.onclick = function () {
            t.date = new Date(t.date.getFullYear() - 1, 1, 1);
            t.load("month");
          };
        } else _prev.className = "disabled";

        // Year
        var _head = document.createElement("li");
        t.head.append(_head);
        _head.innerHTML = t.date.getFullYear();

        // Next
        var _next = document.createElement("li");
        t.head.append(_next);
        _next.innerHTML = ">>";
        if (t.lastdate == undefined || t.date.getFullYear() < t.lastdate.getFullYear()) {
          _next.className = "pointer";
          _next.onclick = function () {
            t.date = new Date(t.date.getFullYear() + 1, 1, 1);
            t.load("month");
          };
        } else _next.className = "disabled";

        // Months
        for (var _y = 0; _y < 3; _y++) {
          var _row = document.createElement("tr");
          t.table.append(_row);
          var _loop2 = function _loop2() {
            var index = _y * 4 + _x;
            var day = new Date(t.date.getFullYear(), index, 1);
            var cell = document.createElement("td");
            _row.append(cell);
            cell.innerHTML = months_short[index];
            if ((t.firstdate != undefined ? day.getTime() >= new Date(t.firstdate).setDate(1) : true) && (t.lastdate != undefined ? day.getTime() <= new Date(t.lastdate).setDate(1) : true)) {
              cell.className = "pointer";
              cell.onclick = function () {
                t.date = new Date(t.date.getFullYear(), index, 1);
                t.load("day");
              };
            } else cell.className = "disabled";
          };
          for (var _x = 0; _x < 4; _x++) {
            _loop2();
          }
        }
      }
    };
    var show = function show(bool) {
      if (bool) {
        var rect = t.host.getBoundingClientRect();
        var x = (rect.left + rect.right) / 2;
        var y = rect.bottom - rect.top + document.documentElement.scrollTop;
        t.frame.style.setProperty("top", y + 20 + "px");
        t.frame.style.setProperty("left", x - 152 + "px");
        document.body.append(t.frame);
      } else if (!bool) document.getElementById("datepicker-frame").remove();
    };
  }
  _createClass(Datepicker, [{
    key: "config",
    value: function config(s) {
      this.firstdate = s.firstdate || this.firstdate;
      this.lastdate = s.lastdate || this.lastdate;
      this.disableddays = s.disableddays || this.disableddays || function () {
        return true;
      };
      this.format = s.format || this.format || function (d) {
        return d;
      };
      if (_typeof(this.firstdate) != "object" && this.firstdate != undefined) console.error("firstdate is not of type Object");else if (_typeof(this.lastdate) != "object" && this.lastdate != undefined) console.error("lastdate is not of type Object");else if (typeof this.disableddays != "function") console.error("disableddays is not of type function");else if (typeof this.format != "function") console.error("format is not of type function");
      var d = new Date();
      var date = d;
      while (!this.disableddays(date)) {
        date = this.firstdate && this.lastdate ? d.getTime() >= this.firstdate.getTime() && d.getTime() <= this.lastdate.getTime() ? d : this.firstdate : this.firstdate ? d.getTime() >= this.firstdate.getTime() ? d : this.firstdate : this.lastdate ? d.getTime() <= this.lastdate.getTime() ? d : this.lastdate : d;
        d.setTime(d.getTime() + DAY);
      }
      this.date = this.date || date;
      this.host.value = this.format(this.date);
    }
  }, {
    key: "getDate",
    value: function getDate() {
      return this.date;
    }
  }, {
    key: "setDate",
    value: function setDate(date) {
      if (date < this.firstdate || date > this.lastdate) return;
      if (!this.disableddays(date)) {
        date = new Date(date.getTime() + DAY);
        this.setDate(date);
        return;
      }
      this.date = date;
      this.host.value = this.format(date);
      if (typeof this.host.onchange == "function") this.host.onchange();
    }
  }]);
  return Datepicker;
}();