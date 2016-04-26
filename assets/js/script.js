
// Drag and Drop Manager
// that allow to take control over files droped into area
// divItemId: id of the div within we want to create drop area
// filesManager: manager which knows what to do with droped files...
var DragAndDropManager = function( divItemId, filesManager){
  this.FilesManager = filesManager;
  
  this.FileDrag = function(e) {    
    e.stopPropagation();
	  e.preventDefault();  	
  };
  
  this.FileSelect = function(e){
    e.stopPropagation();
	  e.preventDefault();	
	  var filesMng = filesManager;
    var files = e.target.files || e.dataTransfer.files;
    filesMng.ProcessFiles( files);   
  };	
  
  // handling events
  var divItem = document.getElementById(divItemId)
  divItem.addEventListener("dragover", this.FileDrag, false);
  divItem.addEventListener("dragleave", this.FileDrag, false);
  divItem.addEventListener("drop", this.FileSelect, false);
};
//----------------------------------------------------------------------------------




// FilesManager
// Object for managing files we are receiving from input-file element or from drop area
// source: id of the input element
// sourceDrop: dropdown area, can be null - then we don't handle dropping files
// processDroppedFileHandler: function that know how to add files to html
var FilesManager = function(source, sourceDrop,  processDroppedFileHandler){
  if( sourceDrop != null && sourceDrop.length > 0){
    this.DropManager = new DragAndDropManager( sourceDrop, this);
  }
  
  
  this.ProcessFiles = function(files){
      for( var i=0, file; file = files[i] ; i++){
        if( file.name.split('.').Last().IsIn(["png", "jpg", "jpeg"])){
          var fr = new FileReader();
          fr.FileName = file.name;
          fr.onload = processDroppedFileHandler;
          fr.readAsDataURL(file);
        }  
      }
  };
  
  
  this.LoadFiles = function(source){
    if( !window.File || !window.FileReader || !window.FileList || !window.Blob){
      alert("This browser does't support File API. Try with another one");
      return;
    }
    
    // we need to get source element - <input type="file"> element 
    var input = document.getElementById(source);
    if( !input){
      alert("Incorect input name");
      return;
    }
    
    if( !input.files){
      alert("No files in the input element are available");
      return;
    }
    
    
    this.ProcessFiles(input.files);    
  };
};
//----------------------------------------------------------------------------------






///----------------------------------------------------------------------------------
// General extensions
///----------------------------------------------------------------------------------

// firs elemenet of the collection
Array.prototype.First = function() {
    if( this != null && this.length > 0){		
		return this[0];
	}
	return null;
};

// last element of the collection
Array.prototype.Last = function() {
    if( this != null && this.length > 0){		
		return this[this.length-1];
	}
	return null;
};


// check if string is in the collection
// strings: array of string to check
String.prototype.IsIn = function(strings) {
    if( this == null || strings == null)
      return false;
    
    for(var i=0, item; item = strings[i]; i++){
      if( item == this)
        return true;
    }
    return false;    
};

