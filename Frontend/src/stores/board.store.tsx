import { create } from "zustand";

interface BoardStore {
    title : string;
    body : string;
    recruitmentClassification : number;
    recruitmentPerson : number;
    processing : number;
    processingDuration : number;
    tech : number[];
    deadLine : string;
    field : number[];
    setTitle : (title: string) => void;
    setBody : (body: string) => void;
    setRecruitmentClassification : (recruitmentClassification: number) => void;
    setRecruitmentPerson : (recruitmentPerson: number) => void;
    setProcessing : (processing: number) => void;
    setProcessingDuration : (processingDuration: number) => void;
    setTech : (tech: number[]) => void;
    setDeadLine : (deadLine: string) => void;
    setField : (field: number[]) => void;
    resetBoard: () => void;
}

const useBoardStore = create<BoardStore>(set => ({
    title : "",
    body : "",
    recruitmentClassification : 0,
    recruitmentPerson : 0,
    processing : 0,
    processingDuration : 0,
    tech : [] as number[],
    deadLine : "",
    field : [] as number[],
    setTitle: (title) => set(state => ({ ...state, title })),
    setBody: (body) => set({ body }),
    setRecruitmentClassification: (recruitmentClassification) => set(state => ({ ...state, recruitmentClassification })),
    setRecruitmentPerson: (recruitmentPerson) => set(state => ({ ...state, recruitmentPerson })),
    setProcessing: (processing) => set(state => ({ ...state, processing })),
    setProcessingDuration: (processingDuration) => set(state => ({ ...state, processingDuration })),
    setTech: (tech) => set(state => ({ ...state, tech })),
    setDeadLine: (deadLine) => set(state => ({ ...state, deadLine })),
    setField: (field) => set(state => ({ ...state, field })),
    resetBoard: () => set(state => ({ ...state, postId: 0, title : "", body : "", recruitmentClassification : 0, recruitmentPerson : 0, processing : 0, processingDuration : 0, tech : [], deadLine : "", field : [], }))
}));

export default useBoardStore;