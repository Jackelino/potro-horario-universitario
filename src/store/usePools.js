import { defineStore } from 'pinia';
import { EngineParams } from '../lib/engineParams';

export const usePoolStore = defineStore('pools', {
    state: () => ({
        pools: [],
        engineParams: new EngineParams(),
        poolsPoppedCache: []
    }),
    actions: {
        addToSubjects(subjects) {
            // Verificar que no tenemos dos materias con el mismo id

            Array.prototype.push.apply(this.subjects, subjects);
        },
        addToPools(pools) {
            for (const newPool of pools) {
                let idList = newPool.pool_id.id_list;
                for (const pool of this.pools) {
                    for (const newId of idList) {
                        for (const id of pool.pool_id.id_list) {
                            if (newId === id) {
                                throw new Error(`Materias con id repetidos: ${id}`);
                            }
                        }
                    }
                }
            }
            Array.prototype.push.apply(this.pools, pools);
        },
        /// Agrega el pool a los parámetros del engine y la elimina de la
        /// lista expuesta en el store.
        addPoolToEngineParams(pool) {
            // Buscar pool en this.pools y eliminarlo.
            let poolIdx = this.pools.indexOf(pool);
            if (poolIdx !== -1) {
                this.pools.splice(poolIdx, 1);
                this.engineParams.addPool(pool);
            }
        },
        removePoolFromEngineParams(pool) {
            this.engineParams.removePool(pool);
            this.pools.push(pool);
        },
        addSeedToEngineParams(group) {
            this.engineParams.addSeed(group);
            let poolIdx = this.pools.findIndex(p => {
                for (const poolId of p.pool_id.id_list) {
                    for (const seedId of group.pool_id.id_list) {
                        if (poolId == seedId) {
                            return true;
                        }
                    }
                }
            });
            let popped = this.pools.splice(poolIdx, 1);
            this.poolsPoppedCache.push(popped);
        },
        removeSeedFromEngineParams(group) {
        }
    },
    getters: {
        groups: (state) => {
            let groups = [];
            for (let i = 0; i < state.pools.length; i++) {
                let currentPool = state.pools[i];
                for (let j = 0; j < currentPool.grid_list.length; j++) {
                    groups.push(currentPool.grid_list[j]);
                }
            }
            return groups;
        },
        subjects: (state) => {
            return state.pools.map((val) => ({
                name: val.grid_list[0].data.nombre,
                subject_id: val.pool_id
            }));

        },
        selectedSubjects: (state) => {
            return state.engineParams.subjects;
        },
        selectedGroups: (state) => {
            return state.engineParams.seeds;
        }
    }
});
