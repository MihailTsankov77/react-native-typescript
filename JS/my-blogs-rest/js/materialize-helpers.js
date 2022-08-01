
export let chipsInstances;
export let chipsEditInstances;

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('#add-blog-form-chips');
    chipsInstances = M.Chips.init(elems, );

    
    

  });

  
  export function addChipsForEdit(tags){
    const elems = document.querySelectorAll('#edit-chips');
    chipsEditInstances = M.Chips.init(elems, );
    tags.forEach(tag => {
        chipsEditInstances[0].addChip({
        tag: tag,
       
        })
    });
    
  }