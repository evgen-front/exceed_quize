export type Question = {
  text: string;
  image: null | string;
  answers: { id: number; text: string; is_true: boolean }[];
};
