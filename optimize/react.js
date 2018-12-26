// react 源码解析





ReactElement.createElement = function(type,config,children){
  var propName;
  var props={};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  )
}


ReactElement = function(type,key,ref,self,source,owner,props){
  var element={
    $$typeof: REACT_ELEMENT_TYPE,
    type:type,
    key:key,
    ref:ref,
    props:props,
    _owner:owner
  };
}