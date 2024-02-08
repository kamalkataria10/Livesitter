import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchOverlay = createAsyncThunk("overlay/fetchOverlay", async () => {
    try {
        const response = await fetch('http://localhost:5000/api/overlays/fetchOverlay');
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Fetching failed.';
    }
});

export const addOverlay = createAsyncThunk("overlay/addOverlay", async (overlayData) => {
    try {
        const response = await fetch('http://localhost:5000/api/overlays/addOverlay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(overlayData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Adding  failed.';
    }
});

export const updateOverlay = createAsyncThunk("overlay/updateOverlay", async (overlayData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/overlays/updateOverlay/${overlayData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(overlayData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Updating failed.';
    }
});

export const deleteOverlay = createAsyncThunk("overlay/deleteOverlay", async (overlayId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/overlays/deleteOverlay/${overlayId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Deleting failed.';
    }
});

export const dropOverlay = createAsyncThunk("overlay/dropOverlay", async (overlayData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/overlays/updateOverlay/${overlayData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(overlayData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Dropping failed.';
    }
});

const initialState = {
    loading: false,
    error: null,
    overlay: [],
};

const overlaySlice = createSlice({
    name: "overlay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOverlay.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOverlay.fulfilled, (state, action) => {
                state.loading = false;
                state.overlay = action.payload;
            })
            .addCase(fetchOverlay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addOverlay.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addOverlay.fulfilled, (state, action) => {
                state.loading = false;
                state.overlay.push(action.payload.overlay);
            })
            .addCase(addOverlay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOverlay.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOverlay.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateOverlay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteOverlay.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOverlay.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(deleteOverlay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(dropOverlay.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dropOverlay.fulfilled, (state, action) => {
                state.loading = false;
                // Update state as needed after dropping the overlay
            })
            .addCase(dropOverlay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const overlayReducer = overlaySlice.reducer;
