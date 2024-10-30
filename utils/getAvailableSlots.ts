const getAvailableSlots = (appointments) => {
  const bookedSlots = new Set(appointments.map(appointment => appointment.time));
  const availableSlots = AVAILABLE_TIMES.filter(slot => !bookedSlots.has(slot));
  return availableSlots;
};