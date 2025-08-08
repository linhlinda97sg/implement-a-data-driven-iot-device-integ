class IoTDevice {
  constructor(id, type, manufacturer, model, firmwareVersion) {
    this.id = id;
    this.type = type;
    this.manufacturer = manufacturer;
    this.model = model;
    this.firmwareVersion = firmwareVersion;
    this.sensorData = [];
  }
}

class Sensor {
  constructor(id, type, unit) {
    this.id = id;
    this.type = type;
    this.unit = unit;
    this.data = [];
  }

  addData(point) {
    this.data.push(point);
  }
}

class DataPoint {
  constructor(timestamp, value) {
    this.timestamp = timestamp;
    this.value = value;
  }
}

class Integrator {
  constructor() {
    this.devices = [];
    this.sensors = [];
  }

  addDevice(device) {
    this.devices.push(device);
  }

  addSensor(sensor) {
    this.sensors.push(sensor);
  }

  integrate(deviceId, sensorId, data) {
    const device = this.devices.find((device) => device.id === deviceId);
    const sensor = this.sensors.find((sensor) => sensor.id === sensorId);
    if (device && sensor) {
      device.sensorData.push(sensor);
      sensor.addData(new DataPoint(new Date(), data));
    }
  }

  getDeviceData(deviceId) {
    const device = this.devices.find((device) => device.id === deviceId);
    return device.sensorData;
  }
}

const integrator = new Integrator();

// sample data
const device1 = new IoTDevice("D1", "Temperature", "ManufacturerA", "ModelA", "1.0");
const device2 = new IoTDevice("D2", "Humidity", "ManufacturerB", "ModelB", "2.0");
const sensor1 = new Sensor("S1", "Temperature", "Celsius");
const sensor2 = new Sensor("S2", "Humidity", "%");

integrator.addDevice(device1);
integrator.addDevice(device2);
integrator.addSensor(sensor1);
integrator.addSensor(sensor2);

integrator.integrate("D1", "S1", 25);
integrator.integrate("D1", "S1", 26);
integrator.integrate("D2", "S2", 60);

console.log(integrator.getDeviceData("D1"));
console.log(integrator.getDeviceData("D2"));