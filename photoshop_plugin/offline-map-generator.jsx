#target photoshop

// layers
var directories = ['layer_1', 'layer_2', 'layer_3', 'layer_4', 'layer_5'];

// paste in place ( see function below)
var cTID = function(s) { return app.charIDToTypeID(s); };
var sTID = function(s) { return app.stringIDToTypeID(s); };

//    {blendMode:BlendMode.NORMAL, fillOpacity:100 },
var layerSettings = [
    {blendMode:BlendMode.MULTIPLY, fillOpacity:55 },
    {blendMode:BlendMode.NORMAL, fillOpacity:75},
    {blendMode:BlendMode.COLORBURN, fillOpacity:20},
    {blendMode:BlendMode.COLORBLEND, fillOpacity:50},
    {blendMode:BlendMode.OVERLAY, fillOpacity:25},
    {blendMode:BlendMode.LINEARLIGHT, fillOpacity:13},
    {blendMode:BlendMode.NORMAL, fillOpacity:16 }
];

var window = new Window( 'dialog', 'Tile Combiner' );
window.size = {width: 300, height: 180};
var panel = window.add('panel', undefined, '');
panel.size = {width: 240, height: 140};
var runButton = panel.add('button', undefined, 'layer_1', {name:'ok'});
var closeBtn = panel.add('button', undefined, 'close', {name:'close'});

runButton.onClick = function() {
    window.close();
    var baseDirectory = Folder.selectDialog("Select the base folder (layer_1)");
    if (baseDirectory) {
        findFiles(baseDirectory);
    }
}

closeBtn.onClick = function() {
    window.close();
}

window.show();

var fileList, srcDoc, filePath, pathSegments, basePath, subDir, fileName, fileNum, fileExt, progressBar;

function findFiles(baseDirectory) {

    var subDirectories = FindAllFolders(baseDirectory);

    for(var i = 0; i < subDirectories.length; i++) {

        fileList = subDirectories[i].getFiles("*.png"); //Use whatever extension you want or no extension to select all files

        for (var j = 0; j < fileList.length; j++) {

            srcDoc =  openFile(fileList[j]);

            // path
            filePath = srcDoc.path.toString();                                      // path
            pathSegments = filePath.split('/');                                     // url segments

            // directories
            basePath = pathSegments.slice(0,-2).join('/') + '/';
            subDir = pathSegments[pathSegments.length - 1];

            // file
            fileName = srcDoc.name;                                                 // the name of the file
            fileNum = fileName.substring(0, fileName.length -4);                    // number (part of file name
            fileExt = fileName.substring(fileName.length -4, fileName.length);      // extension

            processImages();
        }
    }
}

function processImages() {

    srcDoc.activeLayer.name = 'layer_1';

    duplicateLayer(srcDoc.activeLayer);    // duplicate the first layer
    duplicateLayer(srcDoc.activeLayer);    // duplicate the first layer

    activateTopLayer();

    // open the other layers
    for (var i = 1; i < directories.length; i++) {

        // layer 2 and 3 are jpg
        var _ext = fileExt;
        if (i < 3) {
            _ext = '.jpg';
        }

        var _file = openFile(basePath + directories[i] + '/' + subDir + '/' + fileNum + _ext);
        copyPaste(_file, srcDoc);
        srcDoc.activeLayer.name = directories[i];

        if (i !== 3) {
            HueSatLight(0,-22,0);
        }

        if (i === 1) {
            duplicateLayer(srcDoc.activeLayer);
        }

        activateTopLayer();

    }

    editMasterFile();
}

function activateTopLayer() {

    // srcDoc.activeLayer = srcDoc.layers[srcDoc.layers.length - 1];
    srcDoc.activeLayer.move( srcDoc, ElementPlacement.PLACEATBEGINNING);
}

function openFile(filePath) {

    var fileRef = new File(filePath);

    if (fileRef.exists) {
        app.open(fileRef);
    } else {
        alert("error opening " + filePath)
    }

    return app.activeDocument;
}

function copyPaste(fromFile, toFile) {

    fromFile.selection.selectAll();                 // select all
    fromFile.selection.copy();                      //copy image into clipboard
    closeFile(fromFile, false);

    pasteInPlace();

    //return toFile.paste();                          //paste selection into your document (returns new layer)
}

function closeFile(file, save) {
    if (save) {
        saveOutput();
    }
    file.close(SaveOptions.DONOTSAVECHANGES);
}

// crete groups (folders) layersets
function createLayerSet(name) {
    var newLayerSet = srcDoc.layerSets.add();
    newLayerSet.name = name;
}

function editMasterFile() {

    // sort layers
    var layer1Dup = getLayerByname('layer_1_duplicate');
    layer1Dup.name = 'moved';
    var layer3 = getLayerByname('layer_3');
    layer1Dup.move(layer3, ElementPlacement.PLACEBEFORE);

    applyLayerSettings();

    // fill layer 0 with white
    layer1Dup = getLayerByname('layer_1_duplicate');
    srcDoc.activeLayer = layer1Dup;
    var myColor = new SolidColor();
    myColor.rgb.red = 255;
    myColor.rgb.green = 255;
    myColor.rgb.blue = 255;
    srcDoc.selection.fill(myColor);

    srcDoc.flatten();

    srcDoc.activeLayer.adjustBrightnessContrast(0, 10);
    srcDoc.activeLayer.applyUnSharpMask(30, 2, 10);

    // HueSatLight(0,-22,0);

    closeFile(srcDoc, true);
}

function HueSatLight(Hue,Sat,Light) {
    var desc9 = new ActionDescriptor();
    desc9.putBoolean( charIDToTypeID('Clrz'), false );
    var list2 = new ActionList();
    var desc10 = new ActionDescriptor();
    desc10.putInteger( charIDToTypeID('H   '), Hue );
    desc10.putInteger( charIDToTypeID('Strt'), Sat );
    desc10.putInteger( charIDToTypeID('Lght'), Light );
    list2.putObject( charIDToTypeID('Hst2'), desc10 );
    desc9.putList( charIDToTypeID('Adjs'), list2 );
    executeAction( charIDToTypeID('HStr'), desc9, DialogModes.NO );
};

function getLayerByname(name) {

    // name layers, in reverse
    for (var i = 0; i < srcDoc.layers.length; i++) {

        if (srcDoc.layers[i].name === name) {
            return srcDoc.layers[i];
        }
    }
}

function duplicateLayer(layerNameOrObj) {

    var _layer = layerNameOrObj;

    if (typeof layerNameOrObj === 'string') {
        _layer = getLayerByname(name);
    } else if (!layerNameOrObj) {
        _layer = srcDoc.activeLayer;
    }

    var _duplicate = _layer.duplicate();

    _duplicate.name = _layer.name + '_duplicate';

    return _duplicate;
}

function applyLayerSettings() {

    for (var i = 0; i < srcDoc.layers.length; i++) {

        if(layerSettings[i]) {
            for (var key in layerSettings[i]) {
                // alert(layerSettings[i][key]);
                srcDoc.layers[i][key] = layerSettings[i][key];
            }
        }
    }
}

function saveOutput() {

    var filePath = File(basePath + 'combined/' + subDir + '/' + fileName);

    var mainDir = Folder(basePath + 'combined');
    if (!mainDir.exists) {
        mainDir.create();
    }

    var subDirectory = Folder(basePath + 'combined/' + subDir);
    if (!subDirectory.exists) {
        subDirectory.create();
    }

    // jpg save
    // var sfwOptions = new ExportOptionsSaveForWeb();
    // sfwOptions.format = SaveDocumentType.JPEG;
    // sfwOptions.includeProfile = false;
    // sfwOptions.interlaced = 0;
    // sfwOptions.optimized = true;
    // sfwOptions.quality = myJpgQuality;
    // activeDocument.exportDocument(filePath, ExportType.SAVEFORWEB, sfwOptions);

    var saveOptions = new ExportOptionsSaveForWeb();
    saveOptions.format = SaveDocumentType.PNG;
    saveOptions.includeProfile = false;
    saveOptions.colorReduction = ColorReductionType.PERCEPTUAL;
    saveOptions.colors = 32;
    saveOptions.dither = Dither.NOISE;
    saveOptions.PNG8 = true;
    saveOptions.transparency = false;
    srcDoc.exportDocument(filePath, ExportType.SAVEFORWEB, saveOptions);

    // regular save
    // var pngSaveOptions = new PNGSaveOptions();
    // srcDoc.saveAs(filePath, pngSaveOptions, true, Extension.LOWERCASE);
}

function FindAllFolders( srcFolderStr) {

    var _folders = [];
    var fileFolderArray = Folder( srcFolderStr ).getFiles();

    for ( var i = 0; i < fileFolderArray.length; i++ ) {

        var fileFoldObj = fileFolderArray[i];

        if ( fileFoldObj instanceof File ) {

        } else {
            _folders.push( Folder(fileFoldObj) );
            FindAllFolders( fileFoldObj.toString(), _folders );
        }
    }
    return _folders;
}

function pasteInPlace(enabled, withDialog) {
    
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(sTID("inPlace"), true);
    desc1.putEnumerated(cTID('AntA'), cTID('Annt'), cTID('Anno'));
    executeAction(cTID('past'), desc1, dialogMode);
  };