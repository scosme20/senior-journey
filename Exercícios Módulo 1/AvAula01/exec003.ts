type bloodType = 'A' | 'B' | 'AB' | 'O';
type RhFactor = '+' | '-';
type hospitalizationStatus = 'Inpatient' | 'Outpatient' | 'Discharged';



type DataPatient = {
    readonly patientId: string;
    patientName: string;
    patientAge: number;
    patientWeight: number;
    patientHeight: number;
    bloodType: bloodType;
    rhFactor: RhFactor;
    hospitalizationStatus: hospitalizationStatus;
}

const patient1: DataPatient = {
    patientId: '12345',
    patientName: 'John Doe',
    patientAge: 30,
    patientWeight: 80,
    patientHeight: 180,
    bloodType: 'A',
    rhFactor: '+',
    hospitalizationStatus: 'Inpatient'
};

function displayPatientData(patient: DataPatient): void {
    console.log(`Patient ID: ${patient.patientId} | Name: ${patient.patientName} 
        | Age: ${patient.patientAge} | Weight: ${patient.patientWeight}kg 
        | Height: ${patient.patientHeight}cm | Blood Type: ${patient.bloodType}${patient.rhFactor} 
        | Hospitalization Status: ${patient.hospitalizationStatus}`);
}

displayPatientData(patient1);

/*
foi criado um tipo de dado chamado DataPatient, que representa as informações de um paciente em um hospital. 
O tipo inclui propriedades como patientId, patientName, patientAge, patientWeight, patientHeight, bloodType, rhFactor e hospitalizationStatus.
Em seguida, foi criado um objeto chamado patient1 do tipo DataPatient, preenchendo as propriedades com informações específicas de um paciente.
*/