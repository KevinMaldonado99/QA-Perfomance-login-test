import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
    return open('../data/users.csv')
        .split('\n')
        .slice(1)
        .map(line => {
            const [user, passwd] = line.split(',');
            return { user, passwd };
        });
});

export const options = {
    scenarios: {
        login_test: {
            executor: 'constant-arrival-rate',
            rate: 20,
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 20,
            maxVUs: 50,
        },
    },

    thresholds: {
        http_req_duration: ['p(95)<1500'],
        http_req_failed: ['rate<0.03'],
    },
};

export default function () {

    const user = users[Math.floor(Math.random() * users.length)];

    const payload = JSON.stringify({
        username: user.user,
        password: user.passwd
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(
        'https://fakestoreapi.com/auth/login',
        payload,
        params
    );

    check(res, {
        'status es 200': (r) => r.status === 200,
        'response < 1.5s': (r) => r.timings.duration < 1500,
    });
}