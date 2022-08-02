
export let chipsInstances;
export let chipsEditInstances;

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('#add-blog-form-chips');
    chipsInstances = M.Chips.init(elems, );

    
    

  });

  
  export function addChipsForEdit(tags){
    const elems = document.querySelectorAll('#edit-chips');
      chipsEditInstances = M.Chips.init(elems, );
      
    if(tags){
      tags.forEach(tag => {
          chipsEditInstances[0].addChip({
          tag: tag,  
          })
      });
    }
    
    
  }

  // export function showTags(tags){
  //   console.log(tags);
  //   const elems = document.querySelectorAll('#showTags');
  //     chipsEditInstances = M.Chips.init(elems, );
  //   tags = (tags)? tags: ['no tags'];
  //   if(tags.length!==0){
  //     tags.forEach(tag => {
  //         chipsEditInstances[0].addChip({
  //         tag: tag,  
  //         })
  //     });
  //   }
    
    
  // }