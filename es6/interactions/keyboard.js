const EventSource = require('./event-source');
const Event  = require('./event');
const body = window.document.body;


/**
 *  http://javascript.info/tutorial/keyboard-events
 */
class Keyboard extends EventSource {
  constructor(el = body) {
    super(body);
  }

  _createEvent(type, e) {
    const event = new Event(type, e);

    event.shiftKey = e.shiftKey;
    event.ctrlKey = e.ctrlKey;
    event.altKey = e.altKey;
    event.metaKey = e.metaKey;
    event.char = String.fromCharCode(e.keyCode);

    return event;
  }

  _bindEvents() {
    const onKeyDown = (e) => {
      let event = this._createEvent('keydown', e);
      this.emit('event', event);
    }

    const onKeyUp = (e) => {
      let event = this._createEvent('keyup', e);
      this.emit('event', event);
    }

    this.el.onkeydown = onKeyDown;
    this.el.onkeyup = onKeyUp;
  }
}

module.exports = Keyboard;