


  export const findIndex = (projects, id) => {
    let result = -1;
    projects.forEach((project, index) => {
      if (project.id === id) {
        result = index
      }
    });
    return result
  }