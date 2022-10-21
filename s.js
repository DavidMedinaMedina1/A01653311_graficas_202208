"use strict"; 

import * as THREE from "../libs/three.js/three.module.js";
import {OrbitControls} from "../libs/three.js/controls/OrbitControls.js";


let renderer = null, scene = null, camera = null, sol = null, mercurio = null, mercurioGroup = null, venus = null, venusGroup = null, marte = null,
jupiter = null, jupiterGroup = null, saturno = null, saturnoGroup = null, urano = null, uranoGroup = null, neptuno = null, neptunoGroup = null, pluton = null, plutonGroup = null, tierra = null, luna_tierra = null, 
tierraGroup = null, marteGroup = null, solGroup = null, lunaGroup = null;

let directionalLight = null, spotLight = null, ambientLight = null;

const duration = 5000; // ms
let currentTime = Date.now();

function main() 
{
    const canvas = document.getElementById("webglcanvas");
    createScene(canvas);
    crearSistemaSolar();
    update();
}

/**
 * Updates the rotation of the objects in the scene
 */
function animate() 
{
    const now = Date.now();
    const deltat = now - currentTime;
    currentTime = now;
    const fract = deltat / duration;
    const angle = Math.PI * 2 * fract;

    sol.rotation.y += angle / 3;
    sol.rotation.x += angle / 3;
    
    lunaGroup.rotation.z += angle ;
    
    mercurioGroup.rotation.z += angle *2;
    venusGroup.rotation.z += angle * 1.6;
    tierraGroup.rotation.z += angle *1.4 ;
    marteGroup.rotation.z += angle * 1.1;
    jupiterGroup.rotation.z += angle * 0.9;
    saturnoGroup.rotation.z += angle * 0.6;
    uranoGroup.rotation.z += angle *0.4 ;
    neptunoGroup.rotation.z += angle *.2;

    mercurio.rotation.y += angle;
    venus.rotation.y += angle ;
    tierra.rotation.y += angle ;
    marte.rotation.y += angle ;
    jupiter.rotation.y += angle ;
    saturno.rotation.y += angle ;
    urano.rotation.y += angle ;
    neptuno.rotation.y += angle ;

    mercurio.rotation.z += angle;
    venus.rotation.z += angle ;
    tierra.rotation.z += angle ;
    marte.rotation.z += angle ;
    jupiter.rotation.z += angle ;
    saturno.rotation.z += angle ;
    urano.rotation.z += angle ;
    neptuno.rotation.z += angle ;

    controls.update;
}

/**
 * Runs the update loop: updates the objects in the scene
 */
function update(){
    requestAnimationFrame(function() { update(); });
    renderer.render( scene, camera );
    animate();
}

/**
 * Creates a basic scene with lights, a camera, and 3 objects
 * @param {canvas} canvas The canvas element to render on
 */
function createScene(canvas)
{   
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Turn on shadows
    renderer.shadowMap.enabled = true;
    
    // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
    renderer.shadowMap.type = THREE.PCFShadowMap;
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Loader de Background
    const loader = new THREE.TextureLoader();
    const aaa = loader.load("../images/stars.jpg");
    scene.background = aaa;


    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
    camera.rotation.x -= .30;
    camera.position.y = 100;
    camera.position.z = 10;
    scene.add(camera);

    // Se añade el orbit para el movimiento de la escena
    const orbitControls = new OrbitControls(camera, renderer.domElement);

        
    // Add a directional light to show off the objects
    let light = new THREE.PointLight(0xffffff, 3.0, 100000);
    // Position the light out from the scene, pointing at the origin
    light.position.set(0, 0, 0);
    // light.target.position.set(0, -2, 0);
    scene.add(light);

    // This light globally illuminates all objects in the scene equally.
    let ambientLight = new THREE.AmbientLight(0xffccaa, 0.2);
    scene.add(ambientLight);
}


function crearSistemaSolar(){

    //mapeamos las texturas de los planetas
    const textureUrl_sol = "../images/sun_texture.jpg";
    const texture_sol = new THREE.TextureLoader().load(textureUrl_sol);
    const material_sol = new THREE.MeshPhongMaterial({ map: texture_sol });

    const textureUrl_tierra = "../images/earth_atmos_2048.jpg";
    const texture_tierra = new THREE.TextureLoader().load(textureUrl_tierra);
    const material_tierra = new THREE.MeshPhongMaterial({ map: texture_tierra });

    const textureUrl_marte = "../images/mars_1k_color.jpg";
    const texture_marte = new THREE.TextureLoader().load(textureUrl_marte);
    const material_marte = new THREE.MeshPhongMaterial({ map: texture_marte });

    const textureUrl_luna = "../images/moon_1024.jpg";
    const texture_luna = new THREE.TextureLoader().load(textureUrl_luna);
    const material_luna = new THREE.MeshPhongMaterial({ map: texture_luna });

    const textureUrl_mercurio = "../images/mercurymap.jpg";
    const texture_mercurio = new THREE.TextureLoader().load(textureUrl_mercurio);
    const material_mercurio = new THREE.MeshPhongMaterial({ map: texture_mercurio });

    const textureUrl_venus = "../images/venusmap.jpg";
    const texture_venus = new THREE.TextureLoader().load(textureUrl_venus);
    const material_venus = new THREE.MeshPhongMaterial({ map: texture_venus });
    
    const textureUrl_jupiter = "../images/jupitermap.jpg";
    const texture_jupiter = new THREE.TextureLoader().load(textureUrl_jupiter);
    const material_jupiter = new THREE.MeshPhongMaterial({ map: texture_jupiter });

    const textureUrl_saturno = "../images/saturnmap.jpg";
    const texture_saturno = new THREE.TextureLoader().load(textureUrl_saturno);
    const material_saturno = new THREE.MeshPhongMaterial({ map: texture_saturno });

    const textureUrl_urano = "../images/uranusmap.jpg";
    const texture_urano = new THREE.TextureLoader().load(textureUrl_urano);
    const material_urano = new THREE.MeshPhongMaterial({ map: texture_urano });
    
    const textureUrl_neptuno = "../images/neptunemap.jpg";
    const texture_neptuno = new THREE.TextureLoader().load(textureUrl_neptuno);
    const material_neptuno = new THREE.MeshPhongMaterial({ map: texture_neptuno });

    const textureUrl_pluton = "../images/moon_1024.jpg";
    const texture_pluton = new THREE.TextureLoader().load(textureUrl_pluton);
    const material_pluton = new THREE.MeshPhongMaterial({ map: texture_pluton });

    //Se crea el grupo del sol
    solGroup = new THREE.Object3D;
    let geometry = new THREE.SphereGeometry(6, 30, 30);
    sol = new THREE.Mesh(geometry, material_sol);
    solGroup.add( sol );
    solGroup.position.set(0, 0, 0);

    // Se crean los grupos para los planetas
    tierraGroup = new THREE.Object3D;
    marteGroup = new THREE.Object3D;
    mercurioGroup = new THREE.Object3D;
    venusGroup = new THREE.Object3D;
    jupiterGroup = new THREE.Object3D;
    saturnoGroup = new THREE.Object3D;
    uranoGroup = new THREE.Object3D;
    neptunoGroup = new THREE.Object3D;

    solGroup.add(tierraGroup, marteGroup, mercurioGroup, venusGroup, jupiterGroup, saturnoGroup, uranoGroup, neptunoGroup);

    //Mercurio
    geometry = new THREE.SphereGeometry(.3, 20, 20);
    mercurio = new THREE.Mesh(geometry, material_mercurio);
    mercurio.position.set(-8.5, 0, 0);
    mercurioGroup.add( mercurio );

    geometry = new THREE.RingGeometry(8.45, 8.5, 50);
    const aroMercurio = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const mercurioR = new THREE.Mesh(geometry, aroMercurio);
    scene.add(mercurioR);

    //Venus
    geometry = new THREE.SphereGeometry(.9, 20, 20);
    venus = new THREE.Mesh(geometry, material_venus);
    venus.position.set(-11.5, 0, 0);
    venusGroup.add( venus );

    geometry = new THREE.RingGeometry(11.45, 11.5, 50);
    const aroVenus = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const venusR = new THREE.Mesh(geometry, aroVenus);
    scene.add(venusR);

    //Tierra
    geometry = new THREE.SphereGeometry(1, 20, 20);
    tierra = new THREE.Mesh(geometry, material_tierra);
    tierra.position.set(-15.5, 0, 0);
    tierraGroup.add( tierra );

    geometry = new THREE.RingGeometry(15.45, 15.5, 50);
    const aroTierra = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const tierraR = new THREE.Mesh(geometry, aroTierra);
    scene.add(tierraR);

    //Marte
    geometry = new THREE.SphereGeometry(.7, 20, 20);
    marte = new THREE.Mesh(geometry, material_marte);
    marte.position.set(-19, 0, 0);
    marteGroup.add( marte );

    geometry = new THREE.RingGeometry(19, 19.05, 50);
    const aroMarte = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const marteR = new THREE.Mesh(geometry, aroMarte);
    scene.add(marteR);

    //Jupiter
    geometry = new THREE.SphereGeometry(2, 20, 20);
    jupiter = new THREE.Mesh(geometry, material_jupiter);
    jupiter.position.set(-24, 0, 0);
    jupiterGroup.add( jupiter );

    geometry = new THREE.RingGeometry(24, 24.05, 50);
    const aroJupiter = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const jupiterR = new THREE.Mesh(geometry, aroJupiter);
    scene.add(jupiterR);

    //Saturno
    geometry = new THREE.SphereGeometry(1.8, 20, 20);
    saturno = new THREE.Mesh(geometry, material_saturno);
    saturno.position.set(-30, 0, 0);
    saturnoGroup.add( saturno );

    geometry = new THREE.RingGeometry(30, 30.05, 50);
    const aroSaturno = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const saturnoR = new THREE.Mesh(geometry, aroSaturno);
    scene.add(saturnoR);

    //Urano
    geometry = new THREE.SphereGeometry(1.4, 20, 20);
    urano = new THREE.Mesh(geometry, material_urano);
    urano.position.set(-36, 0, 0);
    uranoGroup.add( urano);

    geometry = new THREE.RingGeometry(36, 36.05, 50);
    const aroUrano = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const uranoR = new THREE.Mesh(geometry, aroUrano);
    scene.add(uranoR);

    //Neptuno
    geometry = new THREE.SphereGeometry(1.3, 20, 20);
    neptuno = new THREE.Mesh(geometry, material_neptuno);
    neptuno.position.set(-40, 0, 0);
    neptunoGroup.add( neptuno);

    geometry = new THREE.RingGeometry(40, 40.05, 50);
    const aroNeptuno = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const neptunoR = new THREE.Mesh(geometry, aroNeptuno);
    scene.add(neptunoR);

    //Luna tierra
    lunaGroup = new THREE.Object3D();
    tierraGroup.add(lunaGroup);
    geometry = new THREE.SphereGeometry(1, 10, 10);
    luna_tierra = new THREE.Mesh(geometry, material_luna);
    
    luna_tierra.position.set(0, 1.222, 0);
        
    // Add the luna_tierra mesh to our group
    lunaGroup.add( luna_tierra );

    // Now add the group to our scene
    scene.add( solGroup );

    //Posicion de la luna
    const lunaPos = new THREE.Vector3();
    luna_tierra.getWorldPosition(lunaPos);
    
}

main();