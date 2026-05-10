import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  keyboardAvoid: {
    flex: 1,
  },
  topSection: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingHorizontal: 24,
  },
  vesselContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timeText: {
    fontSize: 56,
    fontWeight: '700',
    color: '#fff',
  },
  phaseLabel: {
    fontSize: 18,
    color: '#888',
    marginTop: 4,
  },
  input: {
    backgroundColor: '#252540',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
    marginBottom: 0,
  },
  inputHintSlot: {
    minHeight: 44,
    marginBottom: 24,
    justifyContent: 'center',
  },
  inputHint: {
    fontSize: 13,
    color: '#888',
  },
  actions: {
    gap: 12,
  },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#6B4423',
  },
  btnPrimaryDisabled: {
    backgroundColor: '#3d2a15',
    opacity: 0.7,
  },
  btnPrimaryText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  btnPrimaryTextDisabled: {
    color: '#aaa',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#555',
  },
  btnSecondaryText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  btnComplete: {
    backgroundColor: '#2d4a2d',
  },
  btnCompleteDone: {
    backgroundColor: '#1e6b1e',
  },
  btnCompleteText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
});
