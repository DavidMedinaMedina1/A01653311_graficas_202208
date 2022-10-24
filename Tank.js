//Examen segundo parcial 
//David Medina Medina A01653311
"use strict"; 

//Realizamos los imports de los modulos
import * as THREE from './libs/three.module.js'
import { OrbitControls } from './libs/controls/OrbitControls.js';
import { OBJLoader } from './libs/loaders/OBJLoader.js';
import { GUI } from "../libs/three.js/libs/dat.gui.module.js"

let renderer = null, scene = null, tanqueGrupo = null, torretaGrupo = null, camera = null, orbitControls = null, group = null, objectList = [];
let directionalLight = null, spotLight = null, ambientLight = null;
let SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;
let tanqueObj = {obj:'Tank/Tank.obj', map:'Tank/Tank_texture.jpg'};
let torretaObj = {obj:'Tank/Turret.obj', map:'Tank/Tank_texture.jpg'};

// se inicializa settings con valor null
let settings = null;
//Path the imagen del piso
let mapUrl = "./checker_large.gif";

//Funcion principal
function main(){
    const canvas = document.getElementById("webglcanvas");
    createScene(canvas);
    initControls();
    createPanel();
    crearTanque();
    update();
}

//Funcion para controlar rotacion de tanque y torreta
function createPanel() {
    // Creamos nuevo objeto de panel con ancho de 300px para dibujarse en pantalla
    const panel = new GUI({width:300});
    // Se ponen los settings a 0
    settings = {
        'Tanque Y': 0,
        'Torreta Y': 0
    }

    // Se van añadiendo las partes a mover en el panel con el moviemiento mínimo y el máximo deseado esto dentro de funciones anónimas
    panel.add(settings, 'Tanque Y', -2.5, 2.5, 0.001).onChange((delta)=> {
        for(const object of objectList)
            if(object)
                object.rotation.y = delta;
    })
    panel.add(settings, 'Torreta Y', -5, 5, 0.001).onChange((delta)=> {
        objectList[1].rotation.y = delta;
    })
}

//Función de try catch para saber si la promesa fallo
function onError ( err ){ console.error(err); };

//Funcion de promesa para saber que se sigue ejecutando
function onProgress( xhr ) 
{
    if ( xhr.lengthComputable ) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( xhr.target.responseURL, Math.round( percentComplete, 2 ) + '% downloaded' );
    }
}

//Función para iluminacon de escena
function initControls()
{
    document.querySelector('#directionalLight').addEventListener('change', (event)=>{
        directionalLight.color.set(event.target.value);
    });
    document.querySelector('#directionalLight').addEventListener('input', (event)=>{
        directionalLight.color.set(event.target.value);
    });
    document.querySelector('#spotLight').addEventListener('change', (event)=>{
        spotLight.color.set(event.target.value);
    });
    document.querySelector('#spotLight').addEventListener('input', (event)=>{
        spotLight.color.set(event.target.value);
    });
    document.querySelector('#ambientLight').addEventListener('change', (event)=>{
        ambientLight.color.set(event.target.value);
    });
    document.querySelector('#ambientLight').addEventListener('input', (event)=>{
        ambientLight.color.set(event.target.value);
    });
}

//Funcion que actualiza escena y orbitController
function update() {
    requestAnimationFrame(function() { update(); });
    renderer.render( scene, camera );
    orbitControls.update();
}

//Funcion asincrona que carga los objetos 3D
async function loadObj(objModelUrl, objectList,xP ,yP, zP){
    try
    {
        const object = await new OBJLoader().loadAsync(objModelUrl.obj, onProgress, onProgress, onError);
        let texture = new THREE.TextureLoader().load(tanqueObj.map);
        console.log(object);
        
            for(const child of object.children){
                child.castShadow = true;
                child.receiveShadow = true;    
                child.material.map = texture;
                child.material.color.set('rgb(0, 255, 0)')
            }
        
        object.scale.set(5, 5, 5);
        object.position.z = zP;
        object.position.x = xP;
        object.position.y = yP;
        object.rotation.y = yP;
        object.name = "tanque";
        
        objectList.push(object);
        console.log(objectList)
        scene.add(object);
    }
    catch (err) {
        onError(err);
    }
}

//Funcion asincrona para crear canvas
async function createScene(canvas) 
{
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    renderer.setSize(canvas.width, canvas.height);

    // Activamos sombras
    renderer.shadowMap.enabled = true;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 3, 10);

    //Agregamos orbitControllers
    orbitControls = new OrbitControls(camera, renderer.domElement);

    // Añadimos luz direccional
    directionalLight = new THREE.DirectionalLight( 0xaaaaaa, 1);

    // Se crean y se añaden las luecs
    directionalLight.position.set(.5, 1, -3);
    directionalLight.target.position.set(0,0,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    spotLight = new THREE.SpotLight (0xaaaaaa);
    spotLight.position.set(2, 8, 15);
    spotLight.target.position.set(-2, 0, -2);
    scene.add(spotLight);

    spotLight.castShadow = true;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow. camera.far = 200;
    spotLight.shadow.camera.fov = 45;
    
    spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

    ambientLight = new THREE.AmbientLight ( 0x444444, 0.8);
    scene.add(ambientLight);
}

//Funcion para llamar el tanque a pantalla
function crearTanque(){
        //Se manda a dibjuar a los objetos 3D en pontalla con funcion loadObj
        loadObj(tanqueObj, objectList, 0,-1.5, .5);
        loadObj(torretaObj, objectList, 0, 0.35, .5);
        group = new THREE.Object3D
        scene.add(group);
        console.log(group)
        
        const map = new THREE.TextureLoader().load(mapUrl);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.repeat.set(8, 8);
    
        let geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
        let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map:map, side:THREE.DoubleSide}));
    
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -4.02;
        mesh.castShadow = false;
        mesh.receiveShadow = true;
        scene.add( mesh );
}

main();