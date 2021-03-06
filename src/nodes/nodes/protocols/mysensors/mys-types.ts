/**
 * Created by Derwish (derwish.pro@gmail.com) on 14.03.2017.
 * License: http://www.gnu.org/licenses/gpl-3.0.txt
 */


export interface I_MYS_Message {
    nodeId: number,
    sensorId: number,
    messageType: number,
    ack?: number,
    subType: number,
    payload?: string
}

export interface I_MYS_Sensor {
    nodeId: number,
    sensorId: number,
    dataType: number,
    lastSeen?: number
    type?: number,
    state?: string,
    shub_node_slot?: number
}

export interface I_MYS_Node {
    id: number,
    sensors: { [id: string]: I_MYS_Sensor },//id = sensorId-datatype
    registered: number,
    lastSeen: number,
    sketchName?: string,
    sketchVersion?: string,
    version?: string,
    isRepeatingNode?: boolean,
    batteryLevel?: number,
    shub_node_id?: number,
    shub_node_cid?: number
}


export let messageType =
    {
        C_PRESENTATION: 0,
        C_SET: 1,
        C_REQ: 2,
        C_INTERNAL: 3,
        C_STREAM: 4
    };


export let messageTypeKey = [
    "C_PRESENTATION",
    "C_SET",
    "C_REQ",
    "C_INTERNAL",
    "C_STREAM"
];
export let sensorType = {
    S_DOOR: 0,
    S_MOTION: 1,
    S_SMOKE: 2,
    S_BINARY: 3,
    S_DIMMER: 4,
    S_COVER: 5,
    S_TEMP: 6,
    S_HUM: 7,
    S_BARO: 8,
    S_WIND: 9,
    S_RAIN: 10,
    S_UV: 11,
    S_WEIGHT: 12,
    S_POWER: 13,
    S_HEATER: 14,
    S_DISTANCE: 15,
    S_LIGHT_LEVEL: 16,
    S_ARDUINO_NODE: 17,
    S_ARDUINO_REPEATER_NODE: 18,
    S_LOCK: 19,
    S_IR: 20,
    S_WATER: 21,
    S_AIR_QUALITY: 22,
    S_CUSTOM: 23,
    S_DUST: 24,
    S_SCENE_CONTROLLER: 25,
    S_RGB_LIGHT: 26,
    S_RGBW_LIGHT: 27,
    S_COLOR_SENSOR: 28,
    S_HVAC: 29,
    S_MULTIMETER: 30,
    S_SPRINKLER: 31,
    S_WATER_LEAK: 32,
    S_SOUND: 33,
    S_VIBRATION: 34,
    S_MOISTURE: 35,
    S_INFO: 36,
    S_GAS: 37,
    S_GPS: 38,
    S_WATER_QUALITY: 39
};


export let sensorTypeKey = [
    "S_DOOR",
    "S_MOTION",
    "S_SMOKE",
    "S_BINARY",
    "S_DIMMER",
    "S_COVER",
    "S_TEMP",
    "S_HUM",
    "S_BARO",
    "S_WIND",
    "S_RAIN",
    "S_UV",
    "S_WEIGHT",
    "S_POWER",
    "S_HEATER",
    "S_DISTANCE",
    "S_LIGHT_LEVEL",
    "S_ARDUINO_NODE",
    "S_ARDUINO_REPEATER_NODE",
    "S_LOCK",
    "S_IR",
    "S_WATER",
    "S_AIR_QUALITY",
    "S_CUSTOM",
    "S_DUST",
    "S_SCENE_CONTROLLER",
    "S_RGB_LIGHT",
    "S_RGBW_LIGHT",
    "S_COLOR_SENSOR",
    "S_HVAC",
    "S_MULTIMETER",
    "S_SPRINKLER",
    "S_WATER_LEAK",
    "S_SOUND",
    "S_VIBRATION",
    "S_MOISTURE",
    "S_INFO",
    "S_GAS",
    "S_GPS",
    "S_WATER_QUALITY"
];



export let sensorSimpleType = {
    "Door": 0,
    "Motion": 1,
    "Smoke": 2,
    "Binary": 3,
    "Dimmer": 4,
    "Cover": 5,
    "Temperature": 6,
    "Humidity": 7,
    "Baro": 8,
    "Wind": 9,
    "Rain": 10,
    "UV": 11,
    "Weight": 12,
    "Power": 13,
    "Heater": 14,
    "Distance": 15,
    "Light level": 16,
    "Non-repeater node": 17,
    "Repeater node": 18,
    "Lock": 19,
    "IR": 20,
    "Water": 21,
    "Air quality": 22,
    "Custom": 23,
    "Dust": 24,
    "Scene controller": 25,
    "RGB Light": 26,
    "RGBW Light": 27,
    "Color sensor": 28,
    "HVAC": 29,
    "Multimiter": 30,
    "Sprinkler": 31,
    "Water leak": 32,
    "Sound": 33,
    "Vibration": 34,
    "Moisture": 35,
    "Info": 36,
    "Gas": 37,
    "GPS": 38,
    "Water quality": 39,
};



export let sensorDataType = {
    V_TEMP: 0,
    V_HUM: 1,
    V_STATUS: 2,
    V_PERCENTAGE: 3,
    V_PRESSURE: 4,
    V_FORECAST: 5,
    V_RAIN: 6,
    V_RAINRATE: 7,
    V_WIND: 8,
    V_GUST: 9,
    V_DIRECTION: 10,
    V_UV: 11,
    V_WEIGHT: 12,
    V_DISTANCE: 13,
    V_IMPEDANCE: 14,
    V_ARMED: 15,
    V_TRIPPED: 16,
    V_WATT: 17,
    V_KWH: 18,
    V_SCENE_ON: 19,
    V_SCENE_OFF: 20,
    V_HVAC_FLOW_STATE: 21,
    V_HVAC_SPEED: 22,
    V_LIGHT_LEVEL: 23,
    V_VAR1: 24,
    V_VAR2: 25,
    V_VAR3: 26,
    V_VAR4: 27,
    V_VAR5: 28,
    V_UP: 29,
    V_DOWN: 30,
    V_STOP: 31,
    V_IR_SEND: 32,
    V_IR_RECEIVE: 33,
    V_FLOW: 34,
    V_VOLUME: 35,
    V_LOCK_STATUS: 36,
    V_LEVEL: 37,
    V_VOLTAGE: 38,
    V_CURRENT: 39,
    V_RGB: 40,
    V_RGBW: 41,
    V_ID: 42,
    V_UNIT_PREFIX: 43,
    V_HVAC_SETPOINT_COOL: 44,
    V_HVAC_SETPOINT_HEAT: 45,
    V_HVAC_FLOW_MODE: 46,
    V_TEXT: 47,
    V_CUSTOM: 48,
    V_POSITION: 49,
    V_IR_RECORD: 50,
    V_PH: 51,
    V_ORP: 52,
    V_EC: 53,
    V_VAR: 54,
    V_VA: 55,
    V_POWER_FACTOR: 56
};



export let sensorDataTypeKey = [
    "V_TEMP",
    "V_HUM",
    "V_STATUS",
    "V_PERCENTAGE",
    "V_PRESSURE",
    "V_FORECAST",
    "V_RAIN",
    "V_RAINRATE",
    "V_WIND",
    "V_GUST",
    "V_DIRECTION",
    "V_UV",
    "V_WEIGHT",
    "V_DISTANCE",
    "V_IMPEDANCE",
    "V_ARMED",
    "V_TRIPPED",
    "V_WATT",
    "V_KWH",
    "V_SCENE_ON",
    "V_SCENE_OFF",
    "V_HVAC_FLOW_STATE",
    "V_HVAC_SPEED",
    "V_LIGHT_LEVEL",
    "V_VAR1",
    "V_VAR2",
    "V_VAR3",
    "V_VAR4",
    "V_VAR5",
    "V_UP",
    "V_DOWN",
    "V_STOP",
    "V_IR_SEND",
    "V_IR_RECEIVE",
    "V_FLOW",
    "V_VOLUME",
    "V_LOCK_STATUS",
    "V_LEVEL",
    "V_VOLTAGE",
    "V_CURRENT",
    "V_RGB",
    "V_RGBW",
    "V_ID",
    "V_UNIT_PREFIX",
    "V_HVAC_SETPOINT_COOL",
    "V_HVAC_SETPOINT_HEAT",
    "V_HVAC_FLOW_MODE",
    "V_TEXT",
    "V_CUSTOM",
    "V_POSITION",
    "V_IR_RECORD",
    "V_PH",
    "V_ORP",
    "V_EC",
    "V_VAR",
    "V_VA",
    "V_POWER_FACTOR"
];



export let internalDataType = {
    I_BATTERY_LEVEL: 0,
    I_TIME: 1,
    I_VERSION: 2,
    I_ID_REQUEST: 3,
    I_ID_RESPONSE: 4,
    I_INCLUSION_MODE: 5,
    I_CONFIG: 6,
    I_FIND_PARENT: 7,
    I_FIND_PARENT_RESPONSE: 8,
    I_LOG_MESSAGE: 9,
    I_CHILDREN: 10,
    I_SKETCH_NAME: 11,
    I_SKETCH_VERSION: 12,
    I_REBOOT: 13,
    I_GATEWAY_READY: 14,
    I_SIGNING_PRESENTATION: 15,
    I_NONCE_REQUEST: 16,
    I_NONCE_RESPONSE: 17,
    I_HEARTBEAT_REQUEST: 18,
    I_PRESENTATION: 19,
    I_DISCOVER_REQUEST: 20,
    I_DISCOVER_RESPONSE: 21,
    I_HEARTBEAT_RESPONSE: 22,
    I_LOCKED: 23,
    I_PING: 24,
    I_PONG: 25,
    I_REGISTRATION_REQUEST: 26,
    I_REGISTRATION_RESPONSE: 27,
    I_DEBUG: 28,
};



export let internalDataTypeKey = [
    "I_BATTERY_LEVEL",
    "I_TIME",
    "I_VERSION",
    "I_ID_REQUEST",
    "I_ID_RESPONSE",
    "I_INCLUSION_MODE",
    "I_CONFIG",
    "I_FIND_PARENT",
    "I_FIND_PARENT_RESPONSE",
    "I_LOG_MESSAGE",
    "I_CHILDREN",
    "I_SKETCH_NAME",
    "I_SKETCH_VERSION",
    "I_REBOOT",
    "I_GATEWAY_READY",
    "I_SIGNING_PRESENTATION",
    "I_NONCE_REQUEST",
    "I_NONCE_RESPONSE",
    "I_HEARTBEAT_REQUEST",
    "I_PRESENTATION",
    "I_DISCOVER_REQUEST",
    "I_DISCOVER_RESPONSE",
    "I_HEARTBEAT_RESPONSE",
    "I_LOCKED",
    "I_PING",
    "I_PONG",
    "I_REGISTRATION_REQUEST",
    "I_REGISTRATION_RESPONSE",
    "I_DEBUG"
];



export let stream = {
    ST_FIRMWARE_CONFIG_REQUEST: 0,
    ST_FIRMWARE_CONFIG_RESPONSE: 1,
    ST_FIRMWARE_REQUEST: 2,
    ST_FIRMWARE_RESPONSE: 3,
    ST_SOUND: 4,
    ST_IMAGE: 5
};



export let streamKey = [
    "ST_FIRMWARE_CONFIG_REQUEST",
    "ST_FIRMWARE_CONFIG_RESPONSE",
    "ST_FIRMWARE_REQUEST",
    "ST_FIRMWARE_RESPONSE",
    "ST_SOUND",
    "ST_IMAGE"
];



export function getSensorDataTypes(sensor_type): [number] {
    switch (sensor_type) {
        case sensorType.S_DOOR:
            return [sensorDataType.V_TRIPPED, sensorDataType.V_ARMED];
        case sensorType.S_MOTION:
            return [sensorDataType.V_TRIPPED, sensorDataType.V_ARMED];
        case sensorType.S_SMOKE:
            return [sensorDataType.V_TRIPPED, sensorDataType.V_ARMED];
        case sensorType.S_BINARY:
            return [sensorDataType.V_STATUS, sensorDataType.V_WATT];
        case sensorType.S_DIMMER:
            return [sensorDataType.V_STATUS, sensorDataType.V_PERCENTAGE, sensorDataType.V_WATT];
        case sensorType.S_COVER:
            return [sensorDataType.V_UP, sensorDataType.V_DOWN, sensorDataType.V_STOP, sensorDataType.V_PERCENTAGE];
        case sensorType.S_TEMP:
            return [sensorDataType.V_TEMP, sensorDataType.V_ID];
        case sensorType.S_HUM:
            return [sensorDataType.V_HUM];
        case sensorType.S_BARO:
            return [sensorDataType.V_PRESSURE, sensorDataType.V_FORECAST];
        case sensorType.S_WIND:
            return [sensorDataType.V_WIND, sensorDataType.V_GUST, sensorDataType.V_DIRECTION];
        case sensorType.S_RAIN:
            return [sensorDataType.V_RAIN, sensorDataType.V_RAINRATE];
        case sensorType.S_UV:
            return [sensorDataType.V_UV];
        case sensorType.S_WEIGHT:
            return [sensorDataType.V_WEIGHT, sensorDataType.V_IMPEDANCE];
        case sensorType.S_POWER:
            return [sensorDataType.V_WATT, sensorDataType.V_KWH, sensorDataType.V_VAR, sensorDataType.V_VA, sensorDataType.V_POWER_FACTOR];
        case sensorType.S_HEATER:
            return [sensorDataType.V_HVAC_SETPOINT_HEAT, sensorDataType.V_HVAC_FLOW_STATE, sensorDataType.V_TEMP, sensorDataType.V_STATUS];
        case sensorType.S_DISTANCE:
            return [sensorDataType.V_DISTANCE, sensorDataType.V_UNIT_PREFIX];
        case sensorType.S_LIGHT_LEVEL:
            return [sensorDataType.V_LIGHT_LEVEL, sensorDataType.V_LEVEL];
        case sensorType.S_ARDUINO_NODE:
            return null;
        case sensorType.S_ARDUINO_REPEATER_NODE:
            return null;
        case sensorType.S_LOCK:
            return [sensorDataType.V_LOCK_STATUS];
        case sensorType.S_IR:
            return [sensorDataType.V_IR_SEND, sensorDataType.V_IR_RECEIVE, sensorDataType.V_IR_RECORD];
        case sensorType.S_WATER:
            return [sensorDataType.V_FLOW, sensorDataType.V_VOLUME];
        case sensorType.S_AIR_QUALITY:
            return [sensorDataType.V_LEVEL, sensorDataType.V_UNIT_PREFIX];
        case sensorType.S_CUSTOM:
            return null;
        case sensorType.S_DUST:
            return [sensorDataType.V_LEVEL, sensorDataType.V_UNIT_PREFIX];
        case sensorType.S_SCENE_CONTROLLER:
            return [sensorDataType.V_SCENE_ON, sensorDataType.V_SCENE_OFF];
        case sensorType.S_RGB_LIGHT:
            return [sensorDataType.V_RGB, sensorDataType.V_WATT];
        case sensorType.S_RGBW_LIGHT:
            return [sensorDataType.V_RGBW, sensorDataType.V_WATT];
        case sensorType.S_COLOR_SENSOR:
            return [sensorDataType.V_RGB];
        case sensorType.S_HVAC:
            return [sensorDataType.V_STATUS, sensorDataType.V_TEMP, sensorDataType.V_HVAC_SETPOINT_HEAT, sensorDataType.V_HVAC_SETPOINT_COOL, sensorDataType.V_HVAC_FLOW_STATE, sensorDataType.V_HVAC_FLOW_MODE, sensorDataType.V_HVAC_SPEED];
        case sensorType.S_MULTIMETER:
            return [sensorDataType.V_VOLTAGE, sensorDataType.V_CURRENT, sensorDataType.V_IMPEDANCE];
        case sensorType.S_SPRINKLER:
            return [sensorDataType.V_STATUS, sensorDataType.V_TRIPPED];
        case sensorType.S_WATER_LEAK:
            return [sensorDataType.V_TRIPPED, sensorDataType.V_ARMED];
        case sensorType.S_SOUND:
            return [sensorDataType.V_LEVEL, sensorDataType.V_TRIPPED, sensorDataType.V_ARMED];
        case sensorType.S_VIBRATION:
            return [sensorDataType.V_LEVEL, sensorDataType.V_TRIPPED, sensorDataType.V_ARMED];
        case sensorType.S_MOISTURE:
            return [sensorDataType.V_LEVEL, sensorDataType.V_TRIPPED, sensorDataType.V_ARMED];
        case sensorType.S_INFO:
            return [sensorDataType.V_TEXT];
        case sensorType.S_GAS:
            return [sensorDataType.V_FLOW, sensorDataType.V_VOLUME];
        case sensorType.S_GPS:
            return [sensorDataType.V_POSITION];
        case sensorType.S_WATER_QUALITY:
            return [sensorDataType.V_TEMP, sensorDataType.V_PH, sensorDataType.V_ORP, sensorDataType.V_EC, sensorDataType.V_STATUS];
    }
}

