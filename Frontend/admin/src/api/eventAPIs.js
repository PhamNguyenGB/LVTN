import axiosClient from "./axiosClient";

export const fetAllEvents = async () => {
    const request = await axiosClient.get('/event');
    return request;
};

export const createEvent = async (dataEvent) => {
    const request = await axiosClient.post('/event/create', dataEvent);
    return request;
};

export const updateEvent = async (dataEvent) => {
    const request = await axiosClient.put('/event/update', dataEvent);
    return request;
};

export const deleteEvent = async (eventId) => {
    const request = await axiosClient.delete(`/event/delete/${eventId}`);
    return request;
};
