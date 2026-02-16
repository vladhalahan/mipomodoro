import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  vesselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 240,
    marginTop: 16,
    marginBottom: 16,
  },
  timerBlock: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 48,
    fontWeight: '200',
    color: '#fff',
    letterSpacing: 2,
  },
  phaseLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  inputHint: {
    fontSize: 13,
    color: '#888',
    marginTop: -16,
    marginBottom: 12,
  },
  actions: {
    gap: 12,
  },
  btn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#d4a02c',
  },
  btnPrimaryDisabled: {
    backgroundColor: 'rgba(212, 160, 44, 0.4)',
    opacity: 0.8,
  },
  btnPrimaryText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  btnPrimaryTextDisabled: {
    color: 'rgba(26, 26, 46, 0.6)',
  },
  btnSecondary: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  btnSecondaryText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  btnComplete: {
    backgroundColor: 'rgba(72, 187, 120, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(72, 187, 120, 0.5)',
  },
  btnCompleteDone: {
    backgroundColor: 'rgba(72, 187, 120, 0.4)',
  },
  btnCompleteText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#5dd39e',
  },
});
