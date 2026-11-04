import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DIRECT_WHATSAPP_URL,
  UI_COPY,
  WORKSHOP_REELS,
  calculateRepairEstimate,
  computeScrollyMetrics,
} from './i18n';

test('computeScrollyMetrics transitions cleanly across all 5 Bike Assembly Steps + Step 6 (10 Gold Medals & 3 Gold Cups)', () => {
  const step1 = computeScrollyMetrics(0.05);
  assert.equal(step1.activeStage, 1);
  assert.equal(step1.trophyMorphProgress, 0);

  const step2 = computeScrollyMetrics(0.25);
  assert.equal(step2.activeStage, 2);

  const step3 = computeScrollyMetrics(0.42);
  assert.equal(step3.activeStage, 3);
  assert.ok(step3.chainDropOffsetPx > 150);

  const step4 = computeScrollyMetrics(0.59);
  assert.equal(step4.activeStage, 4);

  const step5 = computeScrollyMetrics(0.76);
  assert.equal(step5.activeStage, 5);
  assert.ok(step5.superbikeScale > 0.95);

  const step6 = computeScrollyMetrics(0.95);
  assert.equal(step6.activeStage, 6);
  assert.ok(step6.trophyMorphProgress > 0.85);
});

test('DIRECT_WHATSAPP_URL opens WhatsApp directly with zero pre-edit query string', () => {
  assert.equal(DIRECT_WHATSAPP_URL, 'https://wa.me/');
  assert.equal(DIRECT_WHATSAPP_URL.includes('?text='), false);
});

test('WORKSHOP_REELS use pre-cropped static images and bi-lingual Tunisian Arabic + French technical terms', () => {
  for (const reel of WORKSHOP_REELS) {
    assert.ok(reel.imageSrc.startsWith('/assets/aistudio/props/reel-'));
    assert.match(reel.title.tn, /[\u0600-\u06FF]/);
  }
});

test('Master mechanic assembly steps include ultrasonic chain degreasing, ceramic oil/wax, and tubeless liquid sealant across FR, TN, and EN', () => {
  assert.equal(UI_COPY.fr.assemblySteps.length, 5);
  assert.equal(UI_COPY.tn.assemblySteps.length, 5);
  assert.equal(UI_COPY.en.assemblySteps.length, 5);

  // Step 4: Gold Chain ultrasonic degreasing & lube
  assert.match(UI_COPY.fr.assemblySteps[3].description, /dégraissage/i);
  assert.match(UI_COPY.tn.assemblySteps[3].description, /dégraissage/i);
  assert.match(UI_COPY.en.assemblySteps[3].description, /degrease/i);

  // Step 5: Zipp Carbon Wheels & Maxxis Tubeless Sealant Liquid
  assert.match(UI_COPY.fr.assemblySteps[4].description, /tubeless/i);
  assert.match(UI_COPY.tn.assemblySteps[4].description, /liquide préventif tubeless/i);
  assert.match(UI_COPY.en.assemblySteps[4].description, /tubeless sealant liquid/i);

  // Step 6: 10 Gold Medals & 3 Gold Cups
  assert.match(UI_COPY.tn.trophyTransition.title, /10 ميداليات ذهب/);
  assert.match(UI_COPY.tn.trophyTransition.title, /3 كؤوس/);

  const estimate = calculateRepairEstimate('mtb', [
    'complete_overhaul',
    'drivetrain_ultrasonic',
  ]);
  assert.ok(estimate.totalTnd > 0);
});
