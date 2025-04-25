import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface SnippetsState {
  snippets: Snippet[];
  selectedSnippet: Snippet | null;
  loading: boolean;
  error: string | null;
}

const initialState: SnippetsState = {
  snippets: [],
  selectedSnippet: null,
  loading: false,
  error: null,
};

const snippetsSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    setSnippets: (state, action: PayloadAction<Snippet[]>) => {
      state.snippets = action.payload;
    },
    addSnippet: (state, action: PayloadAction<Snippet>) => {
      state.snippets.push(action.payload);
    },
    updateSnippet: (state, action: PayloadAction<Snippet>) => {
      const index = state.snippets.findIndex((snippet) => snippet.id === action.payload.id);
      if (index !== -1) {
        state.snippets[index] = action.payload;
      }
    },
    deleteSnippet: (state, action: PayloadAction<string>) => {
      state.snippets = state.snippets.filter((snippet) => snippet.id !== action.payload);
    },
    setSelectedSnippet: (state, action: PayloadAction<Snippet | null>) => {
      state.selectedSnippet = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSnippets,
  addSnippet,
  updateSnippet,
  deleteSnippet,
  setSelectedSnippet,
  setLoading,
  setError,
} = snippetsSlice.actions;

export default snippetsSlice.reducer; 