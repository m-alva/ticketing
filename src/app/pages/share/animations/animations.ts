import { trigger, transition, style, query, animateChild, group, animate, stagger } from "@angular/animations";

let transitionBack = [
    query(':enter', [
        style({ opacity: '0'})
    ]),
    group([
        query(':leave', [
        animate('600ms ease-out', style({ left: '100%'}))
        ],{ optional: true }),
        query(':enter', [
        animate('600ms ease-out', style({ opacity: '1'}))
        ])
    ])
];

let transitionFront = [
    query(':enter', [
        style({ left: '100%'})
    ]),
    group([
        query(':leave', [
        animate('600ms ease-out', style({ opacity: '0'}))
        ],{ optional: true }),
        query(':enter', [
        animate('600ms ease-out', style({ left: '0%'}))
        ])
    ])
];

export const slideInAnimation = trigger('routeAnimations', [
    transition('Login => HomePage', transitionFront),
    transition('DataAccess => HomePage', transitionFront),
    transition('* => Login', transitionBack),
    transition('* => HomePage', transitionBack),    
    transition( '* => *', transitionFront)
]);