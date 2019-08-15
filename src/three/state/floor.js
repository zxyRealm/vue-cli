import EventEmitter from '../util/event'

/**
 * A FSM
 * 
 * @class World
 * @param { 3D Object } group     
 */
class StateA {
  constructor (group) {
    this.group = group
  }

  // state: up floor ing...
  get up () { return this.up }
  set up (val) { this.up = val }

  // state: down floor ing...
  get down () { return this.down }
  set down (val) { this.down = val}

  // standard floor count
  // get floorCount () { return this.floorCount }
  // set floorCount (obj) { this.floorCount = obj }

  // dynamic floor count
  get count () { return this.count }
  set count (val) { this.count = val }

  init (houseData) {
    StateA.up = false
    StateA.down = false
    this.floorCount = this._getUpDownFloorCount(this.group)                               
    StateA.count = this.standardCount = this.floorCount.position
    this.floorCount.down = this.standardCount - (this.floorCount.down - 1)
    this.floorCount.up = this.standardCount + (this.floorCount.up - 1)
    this.minFloor = this._caculateMinusIndex(houseData)
  }

  upBegin () {
    if ( StateA.count > 0 && !StateA.up && !StateA.down ) {
      StateA.up = true
      EventEmitter.emit('upTrigger')
    }
  }

  downBegin () {
    if ( StateA.count + 4 <= this.floorCount.up && !StateA.down && !StateA.up ) {
      StateA.down = true
    }
  }

  upEnd () {
    StateA.up = false
    StateA.count--
  }

  downEnd () {
    StateA.down = false
    StateA.count ++
  }

  _getUpDownFloorCount(group) {
    var downFloorCount = 0;
    var upFloorCount = 0;
    var position = 0;
    group.children.forEach(function (item) {
      if (item.floor < 0) {
        downFloorCount += 1
      } else {
        upFloorCount += 1
      }
    });
    return {
      position: position,
      down: downFloorCount,
      up: upFloorCount
    }
  }

  _caculateMinusIndex(arr) {
    var minFloor = 1000
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].floor < minFloor && arr[i].floor > 0) {
        minFloor = arr[i].floor;
      }
    }
    return minFloor
  }
}

export default StateA