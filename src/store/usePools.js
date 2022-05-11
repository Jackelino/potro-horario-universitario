import { defineStore } from 'pinia';

export const usePoolStore = defineStore('pools', {
    state: () => ({
        pools: [],
        subjects: []
    }),
    actions: {
        addToSubjects(subjects) {
            // Verificar que no tenemos dos materias con el mismo id
            for (const newSubject of subjects) {
                let idList = newSubject.subject_id.id_list;
                for (const sub of this.subjects) {
                    for (const newId of idList) {
                        for (const id of sub.subject_id.id_list) {
                            if (newId === id) {
                                throw new Error(`Materias con id repetidos: ${id}`);
                            }
                        }
                    }
                }
            }
            Array.prototype.push.apply(this.subjects, subjects);
        }
    }
});
