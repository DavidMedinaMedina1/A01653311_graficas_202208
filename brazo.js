// David Medina Medina A01653311
// Tarea brazo de robot con Threejs
// Documentacion de threejs
// https://threejs.org/manual/
// https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene

"use strict";

// Modulo para poder utilizar threejs
import * as THREE from "../libs/three.js/three.module.js"
// Importamos de sceneHandlers.js para poder interactuar con el mouse
import {addMouseHandler} from "./sceneHandlers.js"
import { BaseScene} from "../common/baseScene.js"
import { GUI } from "../libs/three.js/libs/dat.gui.module.js"

// Renderer se encarga de dibujar cosas en una escena
let renderer = null,

// La escena es el punto de inicio de una aplicación, todo lo que se quiera ver dibujado deberá ser agruegado en la escena
scene = null,

// Permite ver alguna parte de la escena, 
camera = null,
hombro = null,
brazo = null,
codo = null,
antebrazo = null,
muneca = null,
mano = null,
hombroGroup = null,
brazoGroup = null, 
codoGroup = null,
antebrazoGroup = null,
munecaGroup = null,
manoGroup = null;

// se inicializa settings con valor null
let settings = null;

//const duration = 10000; // ms
//let currentTime = Date.now();

function main() {
    const canvas = document.getElementById("webglcanvas");
    scene_setup(canvas); // Aqui se creara la escena, cámara y dejaremos listo el renderer para dibujar
    crear_brazo(canvas); // Aqui crearemos el brazo y se agregara a la escena
    createPanel();  // Se crea panel con sliders para movimiento del brazo
    update(); // Función para actuzalizar escena
}

function createPanel() {
    // Creamos nuevo objeto de panel con ancho de 300px para dibujarse en pantalla
    const panel = new GUI({width:300});
    // Se ponen los settings a 0
    settings = {
        'hombro X': 0,
        'hombro Z': 0,
        'codo X': 0,
        'antebrazo Y': 0,
        'muneca X': 0,
        'mano X':0,
        'mano Z':0
    }

    // Se van añadiendo las partes a mover en el panel con el moviemiento mínimo y el máximo deseado esto dentro de funciones anónimas
    panel.add(settings, 'hombro X', -1.5, 1.5, 0.001).onChange((delta)=> {
        hombroGroup.rotation.x = delta;
    })
    panel.add(settings, 'hombro Z', -1.5, 1.5, 0.001).onChange((delta)=> {
        hombroGroup.rotation.z = delta;
    })
    panel.add(settings, 'codo X', -1, 0, 0.001).onChange((delta)=> {
        codoGroup.rotation.x = delta;
    })
    panel.add(settings, 'antebrazo Y', -.5, .5, 0.001).onChange((delta)=> {
        antebrazoGroup.rotation.y = delta;
    })
    panel.add(settings, 'muneca X', -0.40, 0.40, 0.001).onChange((delta)=> {
        munecaGroup.rotation.x = delta;
    })
    panel.add(settings, 'mano X', -.35, .35, 0.001).onChange((delta)=> {
        manoGroup.rotation.x = delta;
    })
    panel.add(settings, 'mano Z', -.25, .25, 0.001).onChange((delta)=> {
        manoGroup.rotation.z = delta;
    })
}

// Funcion animate, en este caso no se utilizará
function animate() {
}		
 
// Función para actualizar lo que se dibujará en pantalla
function update() {
    requestAnimationFrame(() => update() );
    
    // Aqui la escena se quiere dibujar a partir de que camara
    renderer.render( scene, camera );

    // Mover el brazo
    animate(); 
}

// Función para dibujar la escena en la apantalla
function scene_setup(canvas) {

    // Create the Three.js renderer and attach it to our canvas. Different renderes can be used, for example to a 2D canvas.
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size.
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene.
    scene = new THREE.Scene();
    
    // Adds a color to the background
    scene.background = new THREE.Color("black");

    // Add  a camera so we can view the scene. Three js uses these values to create a projection matrix.
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 40 );
    // camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 40);
    scene.add(camera);

    // Add a directional light to show off the objects
    const light = new THREE.DirectionalLight( "white", 1.0);

    // Position the light out from the scene, pointing at the origin
    light.position.set(-.5, .2, 1);
    light.target.position.set(0,-2,0);
    scene.add(light);
    
    // This light globally illuminates all objects in the scene equally.
    // Cannot cast shadows
    const ambientLight = new THREE.AmbientLight("orange", 0.2);
    scene.add(ambientLight);
}

function crear_brazo(canvas) {

    
    // Para crear un mesh primero cargamos la textura, luego el material, luego la geomietria y al final el mesh
    
    //Para cargar una textura se utiliza un loader
   /// const textureUrl = "../images/companionCube.png";
   /// const texture = new THREE.TextureLoader().load(textureUrl);

    // Creamos un material básico sin texturas ni iluminación ni sombras
   // const material = new THREE.MeshBasicMaterial({ map: texture });

    // Cargamos la geometria, los valores dentro de parentesis la longitud de x, y, z
    const geometry = new THREE.BoxGeometry(.5, .5, .5);//hombro, codo, muñeca
    const geometry2 = new THREE.BoxGeometry(1, 2, 1);//brazo, antebrazo
    const geometry3 = new THREE.BoxGeometry(.8, .5, .5); //mano

    // Une la geometria y el material en un mesh
    // brazo = new THREE.Mesh(geometry, material);

    // Move the mesh back from the camera and tilt it toward the viewer
    // brazo.position.z = -8;
    // brazo.position.x = 0;

    // Crea colores random para los objetos a dibujar en la escena
    const colors = [];
    for(let i = 0; i < 6; i++)
    {
        const red = Math.random();
        const green = Math.random();
        const blue = Math.random();

        for (let j = 0; j< 4; j++)
        {
            colors.push(red, green, blue);
        }
    }

    // Se guardan los colores 
    const colorsAttr = new THREE.Float32BufferAttribute(colors, 3);

    // Se cargan los valores a las geometrías
    geometry.setAttribute('color', colorsAttr);
    geometry2.setAttribute('color', colorsAttr);
    geometry3.setAttribute('color', colorsAttr);

    //Se cargan los valores a los meshes
    const material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});

    //Creamos todos los objetos que conformarán el brazo
    hombro = new THREE.Mesh(geometry, material);
    brazo = new THREE.Mesh(geometry2, material);
    codo = new THREE.Mesh(geometry, material);
    antebrazo = new THREE.Mesh(geometry2, material);
    muneca = new THREE.Mesh(geometry, material);
    mano = new THREE.Mesh(geometry3, material);

    // Create a group to hold all the objects
    hombroGroup = new THREE.Object3D;
    brazoGroup = new THREE.Object3D;
    codoGroup = new THREE.Object3D;
    antebrazoGroup = new THREE.Object3D;
    munecaGroup = new THREE.Object3D;
    manoGroup = new THREE.Object3D;

    // Añadimos los grupos
    // hombro
    hombroGroup.add( hombro );
    hombroGroup.add( brazoGroup);
    hombroGroup.position.set(0, 2.8, -8);
    // brazo
    brazoGroup.add(brazo);
    brazoGroup.add(codoGroup);
    brazoGroup.position.set(0, -1.25, 0);
    // codo
    codoGroup.add( codo );
    codoGroup.add( antebrazoGroup);
    codoGroup.position.set(0, -1.2, 0)
    //antebrazo
    antebrazoGroup.add (antebrazo);
    antebrazoGroup.add( munecaGroup );
    antebrazoGroup.position.set(0, -1.2, 0);
    //muñeca
    munecaGroup.add( muneca );
    munecaGroup.add( manoGroup );
    munecaGroup.position.set(0, -1.3, 0);
    //mano
    manoGroup.add(mano);
    manoGroup.position.set(0, -.5, 0);

    // Añadimos el grupo de hombro a la escena
    scene.add( hombroGroup );

    // Añadimos handling del mouse para rotar la escena          
    //addMouseHandler(canvas, hombroGroup);
}

main();