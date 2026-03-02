// Jest setup file for DOM testing
global.window = {
  scrollTo: jest.fn(),
  location: { href: '' },
  addEventListener: jest.fn(),
  dataLayer: []
};

global.document = {
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(),
  getElementById: jest.fn(),
  createElement: jest.fn(),
  addEventListener: jest.fn()
};

// Mock EmailJS
global.emailjs = {
  init: jest.fn(),
  send: jest.fn().mockResolvedValue({ status: 200, text: 'OK' })
};

// Mock gtag
global.gtag = jest.fn();