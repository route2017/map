
ymaps.ready(init);

var myMap;

function init(){     
    myMap = new ymaps.Map("map", {
        center: [64.47, 99.50],
        zoom: 3
    });
}

    

function handleFileSelect(evt) {
    var files = evt.target.files;
    
    if ( !(/\.csv$/.test(files[0].name)) ) {
        document.getElementById('message').innerText = "File should be CSV!";
        return;
    }
    
    var reader = new FileReader();
    
    reader.onload = (function(theFile) {
        
        return function(e) {
            var res = e.target.result.split("\n");
            setNewPoints(res);
        }
        
    })(files[0]);

    reader.readAsText(files[0], 'CP1251');
    
}

document.getElementById('upload-input').addEventListener('change', handleFileSelect, false);

function setNewPoints(data) {
    for (var x = 0; x < data.length; x++) {
        
        if (data[x]) {
            var line = data[x].split(";");
            var pointName = line[0];
            var pointCoord = line[1].split(",");
        
            var newPoint = new ymaps.Placemark(pointCoord, { 
                balloonContent: pointName 
            });
    
            myMap.geoObjects.add(newPoint);   
        }
        
    }
}
