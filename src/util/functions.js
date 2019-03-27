import * as authActions from "../Store/Actions/type";

const getSearchUrlFromState = (o) => {
  let search = "?";

  Object.keys(o)
    .forEach(function eachKey(key) {
      search+=key+"="+o[key]+"&"
    });

  return search;
};

const upperCaseW = (text,sp='_') => {
  return text.toLowerCase().split(sp).map((s) => s.charAt(0)
      .toUpperCase() + s.substring(1)).join(' ');
};

const isArray = (a) => {
  return (!!a) && (a.constructor === Array);
};

const can = (p,permissions,matchAll=false)=> {

  if(p === undefined){
    return true;
  }
  if(isArray(p)){
    return canAll(p,permissions,matchAll);
  }
  return permissions.filter(v => v === p).length > 0;
};

const canAll = (ps,permissions,matchAll = false)=> {

  let newArray = ps.filter(v => (can(v,permissions) === true) );

  if(matchAll){
    return newArray.length === ps.length;
  }

  return newArray.length > 0;
};

const filterNavLinks = (nav,permissions) => {

  nav.items = nav.items.filter(p => {
    if(p.items){
      p.items = p.items.filter(c => can(c.permission,permissions));
    }
    return can(p.permission,permissions);
  });

  return nav;
};

const errorHandler = (error,dispatch,alertify) => {

  let title = "Error";
  let message = "Something went wrong";

  if (error) {
      message = error.toString();
  }
  const { response } = error;

  if (response) {

      if (response.status === 401) {

          dispatch({
              type: authActions.LOGOUT
          });

          return;
      }
      title = 'Error ' + response.status + ' - ' + response.statusText;
      message = response.data.message;
  }
  alertify.alert(title, message);
}

export {getSearchUrlFromState,upperCaseW,can,filterNavLinks,errorHandler}
