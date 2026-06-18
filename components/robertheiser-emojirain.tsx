import { useEffect } from "react"
import type { FC } from "react"

interface svgNameRainProps {
  svgName?: Array<string>
  active: boolean
}

const svgNameRain: FC<svgNameRainProps> = ({ svgName = ["pumpkin","pumpkin2","pumpkin3","pumpkin4", "ghost"], active}) => {
  useEffect(() => {
    if (!active) return
    var container = document.getElementById('svgNamerain');
    var circles = [];

    for (var i = 0; i < 10; i++) {
      addCircle(i * 150, [10 + 0, 300], svgName[Math.floor(Math.random() * svgName.length)]);
      addCircle(i * 150, [10 + 0, -300], svgName[Math.floor(Math.random() * svgName.length)]);
      addCircle(i * 150, [10 - 400, -300], svgName[Math.floor(Math.random() * svgName.length)]);
    }

    function addCircle(delay, range, color) {
      setTimeout(function() {
        var c = new Circle(range[0] + Math.random() * window.innerWidth, 80 + Math.random() * 4, color, {
          x: -0.15 + Math.random() * 0.3,
          y: 1 + Math.random() * 1
        }, range);
        circles.push(c);
      }, delay);
    }

    function Circle(x, y, n, v, range) {
      var _this = this;
      this.x = x;
      this.y = y;
      this.color = n;
      this.v = v;
      this.range = range;
      this.element = document.createElement('img');
      /*this.element.style.display = 'block';*/
      this.element.style.opacity = 0;
      this.element.style.position = 'absolute';
      this.element.style.fontSize = '26px';
      this.element.style.color = 'orange';
      this.element.src = "svg/" + n + ".svg"
      container.appendChild(this.element);

      this.update = function() {
        if (_this.y > (window.innerHeight - 80)) {
          _this.y = 80 + Math.random() * 4;
          _this.x = _this.range[0] + Math.random() * window.innerWidth;
        }
        _this.y += _this.v.y;
        _this.x += _this.v.x;
        this.element.style.opacity = 1;
        this.element.style.transform = 'translate(' + _this.x + 'px, ' + _this.y + 'px)';
        this.element.style.webkitTransform = 'translate(' + _this.x + 'px, ' + _this.y + 'px)';
        this.element.style.mozTransform = 'translate(' + _this.x + 'px, ' + _this.y + 'px)';
      };
    }

    function animate() {
      for (var i in circles) {
        circles[i].update();
      }
      requestAnimationFrame(animate);
    }

    animate();
  }, [active])

  return <div className="pointer-events-none select-none fixed top-0 left-0 flex justify-center w-[100vw] !max-w-none">
    <div id="svgNamerain" className="block w-full -z-10"></div>
  </div>
}

export default svgNameRain;