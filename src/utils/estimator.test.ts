import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DIRECT_WHATSAPP_URL,
  UI_COPY,
  WORKSHOP_REELS,
  calculateRepairEstimate,
  computeScrollyMetrics,
} from './i18n';

test('computeScrollyMetrics transitions cleanly across Stage 01, 02, 03, and 04 (10 Gold Medals & 3 Gold Cups)', () => {
  const stage1 = computeScrollyMetrics(0.06);
  assert.equal(stage1.activeStage, 1);
  assert.equal(stage1.trophyMorphProgress, 0);

  const stage2 = computeScrollyMetrics(0.42);
  assert.equal(stage2.activeStage, 2);
  assert.ok(stage2.chainDropOffsetPx > 150);

  const stage3 = computeScrollyMetrics(0.68);
  assert.equal(stage3.activeStage, 3);
  assert.ok(stage3.superbikeScale > 0.95);

  const stage4 = computeScrollyMetrics(0.95);
  assert.equal(stage4.activeStage, 4);
  assert.ok(stage4.trophyMorphProgress > 0.85);
});

test('DIRECT_WHATSAPP_URL opens WhatsApp directly with zero pre-edit query string', () => {
  assert.equal(DIRECT_WHATSAPP_URL, 'https://wa.me/');
  assert.equal(DIRECT_WHATSAPP_URL.includes('?text='), false);
});

test('WORKSHOP_REELS use exact 154x246 uncropped vertical Reel coordinates and bi-lingual Tunisian Arabic + French technical terms', () => {
  for (const reel of WORKSHOP_REELS) {
    const parts = reel.imageCropPosition.split(' ').map(Number);
    assert.equal(parts.length, 4);
    assert.equal(parts[2], 154, `Reel ${reel.id} width must be 154px`);
    assert.equal(parts[3], 246, `Reel ${reel.id} height must be 246px`);
    // Ensure Tunisian title contains Arabic script + French technical cycling terms
    assert.match(reel.title.tn, /[\u0600-\u06FF]/);
  }
});

test('UI_COPY.tn combines Tunisian Arabic script with French technical terms (vélo, cadre, support Park Tool, gravel, vélo électrique)', () => {
  assert.match(UI_COPY.tn.stage1.description, /vélo/);
  assert.match(UI_COPY.tn.stage1.description, /cadre/);
  assert.match(UI_COPY.tn.stage1.description, /support Park Tool الأزرق/);
  assert.match(UI_COPY.tn.stage1.description, /gravel/);
  assert.match(UI_COPY.tn.stage1.description, /vélo électrique/);
  assert.match(UI_COPY.tn.trophyTransition.title, /10 ميداليات ذهب/);
  assert.match(UI_COPY.tn.trophyTransition.title, /3 كؤوس/);

  const estimate = calculateRepairEstimate('mtb', [
    'complete_overhaul',
    'drivetrain_ultrasonic',
  ]);
  assert.ok(estimate.totalTnd > 0);
});
