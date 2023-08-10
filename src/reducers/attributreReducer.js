const findAttributeIndex = (state, attributeName) =>
  state.findIndex((attribute) => attribute.name === attributeName);

const attributeReducer = (state, action) => {
  switch (action.type) {
    case "set_accousticness": {
      let index = findAttributeIndex(state, action.payload.name);
      let newState = [...state];
      let attr = { ...newState[index] };
      attr.value = parseFloat(action.payload.value);
      newState[index] = attr;
      // console.log(newState);
      return newState;
    }
    case "set_danceability": {
      let index = findAttributeIndex(state, action.payload.name);
      let newState = [...state];
      let attr = { ...newState[index] };
      attr.value = parseFloat(action.payload.value);
      newState[index] = attr;
      // console.log(newState);
      return newState;
    }
    case "set_energy": {
      let index = findAttributeIndex(state, action.payload.name);
      let newState = [...state];
      let attr = { ...newState[index] };
      attr.value = parseFloat(action.payload.value);
      newState[index] = attr;
      // console.log(newState);
      return newState;
    }
    case "set_instrumentalness": {
      let index = findAttributeIndex(state, action.payload.name);
      let newState = [...state];
      let attr = { ...newState[index] };
      attr.value = parseFloat(action.payload.value);
      newState[index] = attr;
      // console.log(newState);
      return newState;
    }
    case "set_loudness": {
      let index = findAttributeIndex(state, action.payload.name);
      let newState = [...state];
      let attr = { ...newState[index] };
      attr.value = parseFloat(action.payload.value);
      newState[index] = attr;
      // console.log(newState);
      return newState;
    }
    case "set_tempo": {
      let index = findAttributeIndex(state, action.payload.name);
      let newState = [...state];
      let attr = { ...newState[index] };
      attr.value = parseFloat(action.payload.value);
      newState[index] = attr;
      // console.log(newState);
      return newState;
    }
    default: {
      console.log("Cant find index of : " + action.name);
    }
  }
};

export default attributeReducer;
