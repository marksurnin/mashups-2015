var scene, camera, renderer, geometry, material;
var mesh, controls, left, right, startYear;

var blocks = [];

left = 0;
right = 25;
startYear = 2009;

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if ( havePointerLock ) {
    var element = document.body;
    var pointerlockchange = function ( event ) {
        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
            controlsEnabled = true;
            controls.enabled = true;
            blocker.style.display = 'none';
        } else {
            controls.enabled = false;
            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';
            instructions.style.display = '';
        }
    };
    var pointerlockerror = function ( event ) {
        instructions.style.display = '';
    };
    // Hook pointer lock state change events
    document.addEventListener( 'pointerlockchange', pointerlockchange, false );
    document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'pointerlockerror', pointerlockerror, false );
    document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
    document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
    instructions.addEventListener( 'click', function ( event ) {
        instructions.style.display = 'none';
        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        if ( /Firefox/i.test( navigator.userAgent ) ) {
            var fullscreenchange = function ( event ) {
                if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
                    document.removeEventListener( 'fullscreenchange', fullscreenchange );
                    document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
                    element.requestPointerLock();
                }
            };
            document.addEventListener( 'fullscreenchange', fullscreenchange, false );
            document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
            element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
            element.requestFullscreen();
        } else {
            element.requestPointerLock();
        }
    }, false );
} else {
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}


init();
animate();

var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();

function createFloor() {
  geometry = new THREE.PlaneGeometry(59000, 10000, 5, 5);
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI/2));
  var texture = THREE.ImageUtils.loadTexture('./desert.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(64, 64);
  material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(27000, -100, 250);
  mesh.side = THREE.DoubleSide;
  return mesh;
}

function updateBlockHeight(year){
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].geometry.vertices[0].y = data[i][year]*10;
    blocks[i].geometry.vertices[1].y = data[i][year]*10;
    blocks[i].geometry.vertices[4].y = data[i][year]*10;
    blocks[i].geometry.vertices[5].y = data[i][year]*10;
    blocks[i].geometry.verticesNeedUpdate = true;
    console.log(i + ' ' + blocks[i].geometry);
  }
}

$(function() {
  $( "#slider" ).slider({
    value:2014,
    min: 1964,
    max: 2014,
    slide: function( event, ui ) {
      $("#year").val(ui.value);
      // console.log(ui.value);
      updateBlockHeight(ui.value.toString());
    }
  });
  //$("#year").val($("#slider").slider("value"));
  //updateBlockHeight($("#slider").slider("value"));

});

function init() {

  function Block(country) {
    var ctx = this;
    ctx.name = country['Country Name'];
    ctx.height = country[startYear.toString()] * 10;

    ctx.loader = new THREE.TextureLoader();
    ctx.loader.load('./flags/' + (ctx.name.split(' ').join('_')) + '.png', function(texture){
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.y = Math.floor(ctx.height/80);
      ctx.geometry = new THREE.BoxGeometry(100, ctx.height, 100);
      ctx.geometry.verticesNeedUpdate = true;
      ctx.material = new THREE.MeshBasicMaterial({ map: texture, overdraw: true});
      ctx.mesh = new THREE.Mesh(ctx.geometry, ctx.material);
      if (left < right) {
        ctx.mesh.position.set(left, (ctx.height-200)/2, 0);
        left += Math.random() * (800 - 500) + 500;
      } else {
        ctx.mesh.position.set(right, (ctx.height-200)/2, 500);
        right += Math.random() * (800 - 500) + 500;
      }
      scene.add(ctx.mesh);
    });
  };

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 8000 );
  scene = new THREE.Scene();

  controls = new THREE.PointerLockControls( camera );
  scene.add( controls.getObject() );

  var onKeyDown = function ( event ) {
      switch ( event.keyCode ) {
          case 38: // up
          case 87: // w
              moveForward = true;
              break;
          case 37: // left
          case 65: // a
              moveLeft = true; break;
          case 40: // down
          case 83: // s
              moveBackward = true;
              break;
          case 39: // right
          case 68: // d
              moveRight = true;
              break;
      }
  };

  var onKeyUp = function ( event ) {
      switch( event.keyCode ) {
          case 38: // up
          case 87: // w
              moveForward = false;
              break;
          case 37: // left
          case 65: // a
              moveLeft = false;
              break;
          case 40: // down
          case 83: // s
              moveBackward = false;
              break;
          case 39: // right
          case 68: // d
              moveRight = false;
              break;
      }
  };
  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );
  // raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

  scene.add(createFloor());
  camera.position.z = 250;
  camera.position.x = -70;

  //camera.lookAt(new THREE.Vector3(500,0,250));
  // camera.rotation.y = -9 * Math.PI / 180
  //camera.position.x = -500;
  // camera.lookAt(200, 200, 200);
  //camera.rotation.y += 3.6;

  for (var i = 0; i < data.length; i++) {
    blocks.push(new Block(data[i]));
  }

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
  //controls = new THREE.OrbitControls( camera );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  // controls.update();
  if ( controlsEnabled ) {
    var time = performance.now();
    var delta = ( time - prevTime ) / 1000;
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    if ( moveForward ) velocity.z -= 20000 * delta;
    if ( moveBackward ) velocity.z += 20000 * delta;
    if ( moveLeft ) velocity.x -= 1000.0 * delta;
    if ( moveRight ) velocity.x += 1000.0 * delta;
    controls.getObject().translateX( velocity.x * delta );
    controls.getObject().translateY( velocity.y * delta );
    controls.getObject().translateZ( velocity.z * delta );
    if ( controls.getObject().position.y < 10 ) {
        velocity.y = 0;
        controls.getObject().position.y = 10;
        canJump = true;
    }
    prevTime = time;
  }
  renderer.render( scene, camera );
}

// Camera
// changing data points over time