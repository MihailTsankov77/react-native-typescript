

type Identifiable<K> = { id: K };

export interface RepositoryInt<K, V extends Identifiable<K>> {
  findAll(): V[];
  findById(id: K): V | undefined;
  create(entety: V): V;
  update(entety: V): V | undefined;
  delete(id: K): V | undefined;
  count(): number;
}

interface IdGeneratorInt<K>{
    getNextId():K;
}

export class NumberIdGenerator implements IdGeneratorInt<number>{
    private nextId = 0;
    getNextId(): number {
        return ++ this.nextId;
    }

}

export class RepositoryInMemory<K, V extends Identifiable<K>> implements RepositoryInt<K, V>{
    
    entities = new Map<K,V>;

    constructor (private idGenerator: IdGeneratorInt<K>) {} //DI

    findAll(): V[] {
       return Array.from(this.entities.values());
    }

    findById(id: K): V | undefined {
        return this.entities.get(id);
    }
    create(entety: V): V {
        entety.id = this.idGenerator.getNextId();
        this.entities.set(entety.id, entety);
        return entety;
    }
    update(entety: V): V | undefined{
        if(this.findById(entety.id)){
            this.entities.set(entety.id, entety);
            return entety;
        }else{
            return undefined;
        }
    }
    delete(id: K): V | undefined{
        const old = this.findById(id);
        if(old){
            this.entities.delete(id);
        }
        return old;
    }
    count(): number {
        return this.entities.size;
    }

}
