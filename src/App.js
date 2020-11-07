import React, {
  useState,
  useEffect
} from 'react';
import './App.css';

function App() {
  const defaultValue = '';

  const [firstName, setFirstName] = useState(() => {
    const stickyValue = window.localStorage.getItem('storageFirstName');
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  const [lastName, setLastName] = useState(() => {
    const stickyValue = window.localStorage.getItem('storageLastName');
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  const [address, setAddress] = useState(() => {
    const stickyValue = window.localStorage.getItem('storageAddress');
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  const [reason, setReason] = useState(() => {
    const stickyValue = window.localStorage.getItem('storageReason');
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  const reasons = [
    {
      id: '',
      reason: 'Λόγος Μετακίνησης',
      disabled: true
    },
    {
      id: '1',
      reason: 'Μετακίνηση για λόγους υγείας',
      disabled: false
    },
    {
      id: '2',
      reason: 'Μετάβαση σε εν λειτουργία κατάστημα ειδών πρώτης ανάγκης',
      disabled: false
    },
    {
      id: '3',
      reason: 'Μετάβαση σε δημόσια υπηρεσία',
      disabled: false
    },
    {
      id: '4',
      reason: 'Μετάβαση για παροχή βοήθειας σε ανθρώπους που βρίσκονται σε ανάγκη',
      disabled: false
    },
    {
      id: '5',
      reason: 'Μετάβαση σε κηδεία',
      disabled: false
    },
    {
      id: '6',
      reason: 'Σωματική άσκηση σε εξωτερικό χώρο ή κίνηση με κατοικίδιο ζώο',
      disabled: false
    }
  ];

  const compileSMSMessage = () => {
    if (firstName && lastName && address && reason) {
      const nav = navigator.userAgent.toLowerCase();
      let sms = '';
      if (nav.indexOf("iphone") > -1 || nav.indexOf("ipad") > -1) {
        sms += `sms:13033&body=${reason} ${firstName} ${lastName} ${address}`;
      } else {
        sms += `sms://13033?body=${reason} ${firstName} ${lastName} ${address}`;
      }
      return (
        <a href={sms} type="button" className="btn btn-primary">Αποστολή SMS στο 13033</a>
      )
    }

    return null;
  }

  useEffect(() => {
    window.localStorage.setItem('storageFirstName', JSON.stringify(firstName));
    window.localStorage.setItem('storageLastName', JSON.stringify(lastName));
    window.localStorage.setItem('storageAddress', JSON.stringify(address));
    window.localStorage.setItem('storageReason', JSON.stringify(reason));
  });

  return (
    <div className="App p-1 m-3">
      <h4>Βγες έξω!</h4>
      <form className="m-1">
        <div className="form-row m-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Όνομα"
              value={firstName} onChange={event => setFirstName(event.target.value.toLocaleUpperCase('el-GR'))}/>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Επίθετο"
              value={lastName}
              onChange={event => setLastName(event.target.value.toLocaleUpperCase('el-GR'))}/>
          </div>
        </div>
        <div className="form-row m-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Διεύθυνση"
              value={address}
              onChange={event => setAddress(event.target.value.toLocaleUpperCase('el-GR'))}/>
          </div>
        </div>
        <div className="form-row m-4">
          <div className="col">
            <select className="form-control" value={reason} onChange={event => setReason(event.target.value)}>
              {reasons.map((value, i) => {
                return (
                  <option key={i} value={value.id} disabled={value.disabled}>{value.reason}</option>
                );
              })}
            </select>
          </div>
        </div>
      </form>
      {compileSMSMessage()}
    </div>
  );
}

export default App;
