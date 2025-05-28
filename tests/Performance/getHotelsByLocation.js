import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  scenarios: {
    // Constant rate of requests per second
    constant_rate: {
      executor: 'constant-arrival-rate',
      rate: 5,          
      timeUnit: '1s',    
      duration: '15s',
      preAllocatedVUs: 10,  
      maxVUs: 5,           
    },
    //Ramp up users gradually
    ramping_vus: {
      executor: 'ramping-vus',
      startVUs: 0,
      startTime: "16s",
      stages: [
        { duration: '5s', target: 5 },  
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 },   
      ],
      gracefulRampDown: '30s',
    },
  },
  
}

export default function () {
  const res = http.get('http://localhost:3000/hotels')

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response has Demo Condominium2': (r) => r.body.includes('Demo Condominium2'),
    'Response has Demo Hotel Lodge2': (r) => r.body.includes('Demo Hotel Lodge2'),
  })

  sleep(1)
}
