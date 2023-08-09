const findAttributeIndex = (state, attributeName) =>
  state.findIndex((attribute) => attribute.name === attributeName);

const attributeReducer = (state, action) => {
  switch (action.type) {
    case "set_accousticness": {
      let index = findAttributeIndex(state, action.name);
      let newState = state;
      newState[index].value = parseFloat(action.value);
      return newState;
    }
    case "set_danceability": {
      let index = findAttributeIndex(state, action.name);

      let newState = state;
      newState[index].value = parseFloat(action.value);
      return newState;
    }
    case "set_energy": {
      let index = findAttributeIndex(state, action.name);

      let newState = state;
      newState[index].value = parseFloat(action.value);
      return newState;
    }
    case "set_instrumentalness": {
      let index = findAttributeIndex(state, action.name);

      let newState = state;
      newState[index].value = parseFloat(action.value);
      return newState;
    }
    case "set_loudness": {
      let index = findAttributeIndex(state, action.name);

      let newState = state;
      newState[index].value = parseFloat(action.value);
      return newState;
    }
    case "set_tempo": {
      let index = findAttributeIndex(state, action.name);

      let newState = state;
      newState[index].value = parseFloat(action.value);
      return newState;
    }
    default: {
      console.log("Cant find index of : " + action.name);
    }
  }
};

export default attributeReducer;
