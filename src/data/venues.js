// NUS Venues with mock weekly schedules
// In production, this would be built by crawling the NUSMods venue API:
// https://api.nusmods.com/v2/2024-2025/venueInformation.json
// Each entry: { module, type, day, startTime, endTime }

export const VENUES = {
  // ── COMPUTING (COM) ─────────────────────────────────────────────────────────
  "COM1-0201": { name: "COM1-0201", capacity: 80, building: "COM1", zone: "COM", type: "Seminar Room" },
  "COM1-0203": { name: "COM1-0203", capacity: 80, building: "COM1", zone: "COM", type: "Seminar Room" },
  "COM1-B108": { name: "COM1-B108", capacity: 60, building: "COM1", zone: "COM", type: "Tutorial Room" },
  "COM1-B109": { name: "COM1-B109", capacity: 60, building: "COM1", zone: "COM", type: "Tutorial Room" },
  "COM2-0115": { name: "COM2-0115", capacity: 40, building: "COM2", zone: "COM", type: "Tutorial Room" },
  "COM2-0117": { name: "COM2-0117", capacity: 40, building: "COM2", zone: "COM", type: "Tutorial Room" },
  "COM2-0202": { name: "COM2-0202", capacity: 50, building: "COM2", zone: "COM", type: "Seminar Room" },
  "I3-AUD": { name: "I3 Auditorium", capacity: 200, building: "I3", zone: "COM", type: "Auditorium" },
  "i3-Aud": { name: "i3 Auditorium", capacity: 200, building: "i3", zone: "COM", type: "Auditorium" },

  // ── SCIENCE (FOS) ───────────────────────────────────────────────────────────
  "S1-0210": { name: "S1-0210", capacity: 50, building: "S1", zone: "FOS", type: "Tutorial Room" },
  "S2-0408": { name: "S2-0408", capacity: 50, building: "S2", zone: "FOS", type: "Tutorial Room" },
  "S3-0322": { name: "S3-0322", capacity: 60, building: "S3", zone: "FOS", type: "Seminar Room" },
  "S4-0408": { name: "S4-0408", capacity: 80, building: "S4", zone: "FOS", type: "Lecture Theatre" },
  "S5-0252": { name: "S5-0252", capacity: 40, building: "S5", zone: "FOS", type: "Tutorial Room" },
  "S7-0302": { name: "S7-0302", capacity: 50, building: "S7", zone: "FOS", type: "Tutorial Room" },
  "S16-0432": { name: "S16-0432", capacity: 40, building: "S16", zone: "FOS", type: "Tutorial Room" },
  "S17-0406": { name: "S17-0406", capacity: 90, building: "S17", zone: "FOS", type: "Lecture Theatre" },
  "LT27": { name: "LT27", capacity: 350, building: "LT", zone: "FOS", type: "Lecture Theatre" },
  "LT33": { name: "LT33", capacity: 300, building: "LT", zone: "FOS", type: "Lecture Theatre" },
  "LT34": { name: "LT34", capacity: 300, building: "LT", zone: "FOS", type: "Lecture Theatre" },

  // ── ARTS & SOCIAL SCIENCES (FASS) ──────────────────────────────────────────
  "AS1-0203": { name: "AS1-0203", capacity: 45, building: "AS1", zone: "FASS", type: "Seminar Room" },
  "AS2-0602": { name: "AS2-0602", capacity: 45, building: "AS2", zone: "FASS", type: "Tutorial Room" },
  "AS3-0208": { name: "AS3-0208", capacity: 45, building: "AS3", zone: "FASS", type: "Tutorial Room" },
  "AS4-0204": { name: "AS4-0204", capacity: 35, building: "AS4", zone: "FASS", type: "Seminar Room" },
  "AS5-0302": { name: "AS5-0302", capacity: 50, building: "AS5", zone: "FASS", type: "Tutorial Room" },
  "AS6-0209": { name: "AS6-0209", capacity: 60, building: "AS6", zone: "FASS", type: "Lecture Theatre" },
  "AS7-0114": { name: "AS7-0114", capacity: 40, building: "AS7", zone: "FASS", type: "Seminar Room" },

  // ── BUSINESS (BIZ) ──────────────────────────────────────────────────────────
  "BIZ1-0202": { name: "BIZ1-0202", capacity: 80, building: "BIZ1", zone: "BIZ", type: "Seminar Room" },
  "BIZ1-0303": { name: "BIZ1-0303", capacity: 80, building: "BIZ1", zone: "BIZ", type: "Seminar Room" },
  "BIZ2-0115": { name: "BIZ2-0115", capacity: 100, building: "BIZ2", zone: "BIZ", type: "Lecture Theatre" },
  "BIZ2-0203": { name: "BIZ2-0203", capacity: 80, building: "BIZ2", zone: "BIZ", type: "Seminar Room" },

  // ── ENGINEERING (ENG) ───────────────────────────────────────────────────────
  "E1-0607": { name: "E1-0607", capacity: 50, building: "E1", zone: "ENG", type: "Tutorial Room" },
  "E2-0607": { name: "E2-0607", capacity: 50, building: "E2", zone: "ENG", type: "Tutorial Room" },
  "E3-0620": { name: "E3-0620", capacity: 60, building: "E3", zone: "ENG", type: "Seminar Room" },
  "E4-0418": { name: "E4-0418", capacity: 45, building: "E4", zone: "ENG", type: "Tutorial Room" },
  "E5-0318": { name: "E5-0318", capacity: 80, building: "E5", zone: "ENG", type: "Lecture Theatre" },
  "E6-0405": { name: "E6-0405", capacity: 40, building: "E6", zone: "ENG", type: "Tutorial Room" },
  "EW1-0301": { name: "EW1-0301", capacity: 50, building: "EW1", zone: "ENG", type: "Seminar Room" },

  // ── UTOWN ───────────────────────────────────────────────────────────────────
  "ERC-0203": { name: "ERC-0203", capacity: 50, building: "ERC", zone: "UTOWN", type: "Seminar Room" },
  "CAPT-0204": { name: "CAPT-0204", capacity: 40, building: "CAPT", zone: "UTOWN", type: "Seminar Room" },
  "UTR-LT51": { name: "UTown LT51", capacity: 180, building: "UTR", zone: "UTOWN", type: "Lecture Theatre" },
  "UTR-LT52": { name: "UTown LT52", capacity: 180, building: "UTR", zone: "UTOWN", type: "Lecture Theatre" },
  "UTR-SR2": { name: "UTown SR2", capacity: 50, building: "UTR", zone: "UTOWN", type: "Seminar Room" },
};

// Mock occupancy schedules per venue per day
// Format: [{ start: "HHMM", end: "HHMM", module: "CSXXXX", type: "Lecture|Tutorial|Lab" }]
export const SCHEDULES = {
  "COM1-0201": {
    Monday: [
      { start: "0800", end: "1000", module: "CS1010E", type: "Lecture" },
      { start: "1400", end: "1600", module: "CS2040S", type: "Tutorial" },
    ],
    Tuesday: [
      { start: "1000", end: "1200", module: "CS3230", type: "Lecture" },
      { start: "1600", end: "1800", module: "CS4248", type: "Seminar" },
    ],
    Wednesday: [
      { start: "0800", end: "1000", module: "CS2103T", type: "Lecture" },
      { start: "1200", end: "1400", module: "CS3235", type: "Tutorial" },
      { start: "1600", end: "1800", module: "CS4236", type: "Lecture" },
    ],
    Thursday: [
      { start: "1000", end: "1200", module: "CS4225", type: "Lecture" },
      { start: "1400", end: "1600", module: "CS5228", type: "Seminar" },
    ],
    Friday: [
      { start: "0800", end: "1000", module: "CS1231", type: "Lecture" },
      { start: "1200", end: "1400", module: "CS2106", type: "Tutorial" },
    ],
    Saturday: [],
  },
  "COM1-0203": {
    Monday: [
      { start: "1000", end: "1200", module: "CS2100", type: "Lecture" },
      { start: "1600", end: "1800", module: "CS3281", type: "Seminar" },
    ],
    Tuesday: [
      { start: "0800", end: "1000", module: "CS3210", type: "Lecture" },
      { start: "1400", end: "1600", module: "CS4236", type: "Tutorial" },
    ],
    Wednesday: [
      { start: "1000", end: "1200", module: "CS2105", type: "Lecture" },
      { start: "1600", end: "1800", module: "CS5228", type: "Lecture" },
    ],
    Thursday: [
      { start: "0800", end: "1000", module: "CS3281", type: "Lecture" },
      { start: "1200", end: "1400", module: "CS4218", type: "Tutorial" },
    ],
    Friday: [
      { start: "1000", end: "1200", module: "CS3244", type: "Lecture" },
      { start: "1400", end: "1600", module: "CS5242", type: "Tutorial" },
    ],
    Saturday: [],
  },
  "COM1-B108": {
    Monday: [
      { start: "0800", end: "0900", module: "CS1010", type: "Tutorial" },
      { start: "1000", end: "1100", module: "CS1010", type: "Tutorial" },
      { start: "1200", end: "1300", module: "CS2040S", type: "Tutorial" },
      { start: "1400", end: "1500", module: "CS2040S", type: "Tutorial" },
      { start: "1700", end: "1800", module: "CS2103T", type: "Tutorial" },
    ],
    Tuesday: [
      { start: "0900", end: "1000", module: "CS1231", type: "Tutorial" },
      { start: "1100", end: "1200", module: "CS2106", type: "Tutorial" },
      { start: "1500", end: "1600", module: "CS3230", type: "Tutorial" },
    ],
    Wednesday: [
      { start: "0800", end: "0900", module: "CS2100", type: "Tutorial" },
      { start: "1000", end: "1100", module: "CS2100", type: "Tutorial" },
      { start: "1400", end: "1500", module: "CS3244", type: "Tutorial" },
      { start: "1600", end: "1700", module: "CS4225", type: "Tutorial" },
    ],
    Thursday: [
      { start: "0900", end: "1000", module: "CS2103T", type: "Tutorial" },
      { start: "1100", end: "1200", module: "CS3235", type: "Tutorial" },
      { start: "1300", end: "1400", module: "CS4218", type: "Tutorial" },
      { start: "1700", end: "1800", module: "CS5228", type: "Tutorial" },
    ],
    Friday: [
      { start: "0800", end: "0900", module: "CS1010E", type: "Tutorial" },
      { start: "1200", end: "1300", module: "CS2040S", type: "Tutorial" },
      { start: "1400", end: "1500", module: "CS3230", type: "Tutorial" },
    ],
    Saturday: [
      { start: "0900", end: "1100", module: "CS3281", type: "Workshop" },
    ],
  },
  "COM2-0115": {
    Monday: [
      { start: "1000", end: "1200", module: "CS2103T", type: "Seminar" },
      { start: "1400", end: "1600", module: "CS5242", type: "Lecture" },
    ],
    Tuesday: [
      { start: "0800", end: "1000", module: "CS4218", type: "Lecture" },
      { start: "1600", end: "1800", module: "CS5228", type: "Tutorial" },
    ],
    Wednesday: [
      { start: "1000", end: "1200", module: "CS4225", type: "Tutorial" },
    ],
    Thursday: [
      { start: "0800", end: "1000", module: "CS3210", type: "Tutorial" },
      { start: "1200", end: "1400", module: "CS4248", type: "Tutorial" },
      { start: "1600", end: "1800", module: "CS5242", type: "Seminar" },
    ],
    Friday: [
      { start: "1000", end: "1200", module: "CS3281", type: "Seminar" },
      { start: "1400", end: "1600", module: "CS5228", type: "Seminar" },
    ],
    Saturday: [],
  },
  "COM2-0117": {
    Monday: [
      { start: "0800", end: "1000", module: "CS4236", type: "Lecture" },
    ],
    Tuesday: [
      { start: "1200", end: "1400", module: "CS3244", type: "Tutorial" },
      { start: "1600", end: "1800", module: "CS4236", type: "Seminar" },
    ],
    Wednesday: [
      { start: "0800", end: "1000", module: "CS5228", type: "Lecture" },
      { start: "1400", end: "1600", module: "CS4248", type: "Lecture" },
    ],
    Thursday: [
      { start: "1000", end: "1200", module: "CS3230", type: "Tutorial" },
    ],
    Friday: [
      { start: "0800", end: "1000", module: "CS4218", type: "Seminar" },
      { start: "1200", end: "1400", module: "CS5242", type: "Tutorial" },
      { start: "1600", end: "1800", module: "CS3210", type: "Seminar" },
    ],
    Saturday: [],
  },
  "S4-0408": {
    Monday: [
      { start: "1000", end: "1200", module: "MA1521", type: "Lecture" },
      { start: "1600", end: "1800", module: "MA2001", type: "Lecture" },
    ],
    Tuesday: [
      { start: "0800", end: "1000", module: "ST2334", type: "Lecture" },
      { start: "1200", end: "1400", module: "MA1522", type: "Lecture" },
    ],
    Wednesday: [
      { start: "1000", end: "1200", module: "MA1521", type: "Lecture" },
      { start: "1600", end: "1800", module: "MA3252", type: "Lecture" },
    ],
    Thursday: [
      { start: "0800", end: "1000", module: "ST2334", type: "Lecture" },
      { start: "1400", end: "1600", module: "MA2104", type: "Lecture" },
    ],
    Friday: [
      { start: "1000", end: "1200", module: "MA1522", type: "Lecture" },
      { start: "1400", end: "1600", module: "MA1521", type: "Lecture" },
    ],
    Saturday: [],
  },
  "LT27": {
    Monday: [
      { start: "0800", end: "1000", module: "GES1000", type: "Lecture" },
      { start: "1200", end: "1400", module: "GEA1000", type: "Lecture" },
      { start: "1600", end: "1800", module: "GEQ1000", type: "Lecture" },
    ],
    Tuesday: [
      { start: "0800", end: "1000", module: "GER1000", type: "Lecture" },
      { start: "1400", end: "1600", module: "GET1000", type: "Lecture" },
    ],
    Wednesday: [
      { start: "1000", end: "1200", module: "GEH1000", type: "Lecture" },
      { start: "1600", end: "1800", module: "GEI1000", type: "Lecture" },
    ],
    Thursday: [
      { start: "0800", end: "1000", module: "GEJ1000", type: "Lecture" },
      { start: "1400", end: "1600", module: "GEK1000", type: "Lecture" },
    ],
    Friday: [
      { start: "1000", end: "1200", module: "GEL1000", type: "Lecture" },
      { start: "1400", end: "1600", module: "GES1000", type: "Lecture" },
    ],
    Saturday: [],
  },
  "LT33": {
    Monday: [
      { start: "1000", end: "1200", module: "PC1431", type: "Lecture" },
      { start: "1400", end: "1600", module: "PC1432", type: "Lecture" },
    ],
    Tuesday: [
      { start: "0800", end: "1000", module: "CM1121", type: "Lecture" },
      { start: "1600", end: "1800", module: "LS1301", type: "Lecture" },
    ],
    Wednesday: [
      { start: "0800", end: "1000", module: "MA1521", type: "Lecture" },
      { start: "1200", end: "1400", module: "PC1431", type: "Lecture" },
    ],
    Thursday: [
      { start: "1000", end: "1200", module: "CM1121", type: "Lecture" },
      { start: "1600", end: "1800", module: "MA1522", type: "Lecture" },
    ],
    Friday: [
      { start: "0800", end: "1000", module: "LS1301", type: "Lecture" },
      { start: "1400", end: "1600", module: "PC1432", type: "Lecture" },
    ],
    Saturday: [],
  },
  "AS6-0209": {
    Monday: [
      { start: "1000", end: "1200", module: "EN1101E", type: "Lecture" },
      { start: "1400", end: "1600", module: "PL1101E", type: "Lecture" },
    ],
    Tuesday: [
      { start: "0800", end: "1000", module: "SC1101E", type: "Lecture" },
      { start: "1600", end: "1800", module: "EC1301", type: "Lecture" },
    ],
    Wednesday: [
      { start: "0800", end: "1000", module: "PH1102E", type: "Lecture" },
      { start: "1400", end: "1600", module: "EN1101E", type: "Lecture" },
    ],
    Thursday: [
      { start: "1000", end: "1200", module: "PL1101E", type: "Lecture" },
      { start: "1600", end: "1800", module: "SC1101E", type: "Lecture" },
    ],
    Friday: [
      { start: "1200", end: "1400", module: "EC1301", type: "Lecture" },
    ],
    Saturday: [],
  },
  "BIZ2-0115": {
    Monday: [
      { start: "0800", end: "1000", module: "ACC1701X", type: "Lecture" },
      { start: "1400", end: "1600", module: "MKT1705X", type: "Lecture" },
    ],
    Tuesday: [
      { start: "1000", end: "1200", module: "BSP1702", type: "Lecture" },
      { start: "1600", end: "1800", module: "FIN2704X", type: "Lecture" },
    ],
    Wednesday: [
      { start: "0800", end: "1000", module: "MNO1706", type: "Lecture" },
      { start: "1200", end: "1400", module: "ACC1701X", type: "Lecture" },
    ],
    Thursday: [
      { start: "1000", end: "1200", module: "MKT1705X", type: "Lecture" },
      { start: "1400", end: "1600", module: "BSP1702", type: "Lecture" },
    ],
    Friday: [
      { start: "0800", end: "1000", module: "FIN2704X", type: "Lecture" },
      { start: "1400", end: "1600", module: "MNO1706", type: "Lecture" },
    ],
    Saturday: [],
  },
  "E5-0318": {
    Monday: [
      { start: "0800", end: "1000", module: "EE2211", type: "Lecture" },
      { start: "1400", end: "1600", module: "EE3431C", type: "Lecture" },
    ],
    Tuesday: [
      { start: "1000", end: "1200", module: "ME2135", type: "Lecture" },
      { start: "1600", end: "1800", module: "CEE2131", type: "Lecture" },
    ],
    Wednesday: [
      { start: "0800", end: "1000", module: "EE2211", type: "Lecture" },
      { start: "1200", end: "1400", module: "ChE2181", type: "Lecture" },
    ],
    Thursday: [
      { start: "1000", end: "1200", module: "ME2135", type: "Lecture" },
      { start: "1600", end: "1800", module: "EE3431C", type: "Lecture" },
    ],
    Friday: [
      { start: "0800", end: "1000", module: "CEE2131", type: "Lecture" },
      { start: "1400", end: "1600", module: "ChE2181", type: "Lecture" },
    ],
    Saturday: [],
  },
  "UTR-LT51": {
    Monday: [
      { start: "1000", end: "1200", module: "USS2105", type: "Lecture" },
      { start: "1400", end: "1600", module: "UFS1101", type: "Lecture" },
    ],
    Tuesday: [
      { start: "0800", end: "1000", module: "UTC1102B", type: "Lecture" },
      { start: "1400", end: "1600", module: "USS2105", type: "Lecture" },
    ],
    Wednesday: [
      { start: "1000", end: "1200", module: "UFS1101", type: "Lecture" },
      { start: "1600", end: "1800", module: "UTC1102B", type: "Lecture" },
    ],
    Thursday: [
      { start: "0800", end: "1000", module: "USS2105", type: "Lecture" },
    ],
    Friday: [
      { start: "1200", end: "1400", module: "UFS1101", type: "Lecture" },
      { start: "1600", end: "1800", module: "UTC1102B", type: "Lecture" },
    ],
    Saturday: [],
  },
  "ERC-0203": {
    Monday: [
      { start: "1400", end: "1600", module: "ERC1001", type: "Seminar" },
    ],
    Tuesday: [
      { start: "1000", end: "1200", module: "ERC2001", type: "Seminar" },
    ],
    Wednesday: [
      { start: "1600", end: "1800", module: "ERC1001", type: "Seminar" },
    ],
    Thursday: [],
    Friday: [
      { start: "1000", end: "1200", module: "ERC3001", type: "Seminar" },
    ],
    Saturday: [],
  },
};

export const ZONES = [
  { id: "ALL", label: "All Zones" },
  { id: "COM", label: "Computing (COM1/COM2/i3)" },
  { id: "FOS", label: "Science (S1–S7, LTs)" },
  { id: "FASS", label: "Arts & Social Sciences (AS1–AS8)" },
  { id: "BIZ", label: "Business (BIZ1/BIZ2)" },
  { id: "ENG", label: "Engineering (E1–E7)" },
  { id: "UTOWN", label: "UTown (ERC/CAPT/UTR)" },
];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const TIME_SLOTS = [
  "0800","0830","0900","0930","1000","1030","1100","1130",
  "1200","1230","1300","1330","1400","1430","1500","1530",
  "1600","1630","1700","1730","1800","1830","1900","1930",
  "2000","2030","2100","2130","2200",
];

export function formatTime(t) {
  const h = parseInt(t.slice(0, 2));
  const m = t.slice(2);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${m}${ampm}`;
}

export function timeToMinutes(t) {
  return parseInt(t.slice(0, 2)) * 60 + parseInt(t.slice(2));
}

export function isOccupied(schedule, day, timeSlot) {
  const daySchedule = schedule[day] || [];
  const slotMin = timeToMinutes(timeSlot);
  return daySchedule.find(
    (slot) => timeToMinutes(slot.start) <= slotMin && slotMin < timeToMinutes(slot.end)
  ) || null;
}

export function getNextOccupancy(schedule, day, timeSlot) {
  const daySchedule = (schedule[day] || []).slice().sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
  const slotMin = timeToMinutes(timeSlot);
  return daySchedule.find(slot => timeToMinutes(slot.start) > slotMin) || null;
}

export function getEmptyDuration(schedule, day, timeSlot) {
  const next = getNextOccupancy(schedule, day, timeSlot);
  if (!next) return null;
  const diffMin = timeToMinutes(next.start) - timeToMinutes(timeSlot);
  const hours = Math.floor(diffMin / 60);
  const mins = diffMin % 60;
  return { duration: `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : ""}`.trim(), next };
}
