import { Component, type ReactNode } from 'react';

type Props = { name: string; children: ReactNode };
type State = { hasError: boolean; error?: Error };

export class RemoteBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error(`[RemoteBoundary:${this.props.name}]`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 16, margin: 12, border: '1px dashed #d33',
            borderRadius: 8, background: '#fff5f5', color: '#b00',
            fontFamily: 'system-ui, sans-serif', fontSize: 14,
          }}
        >
          Remote <b>{this.props.name}</b> failed to load. The rest of the
          page keeps working.
          {this.state.error && (
            <div style={{ marginTop: 6, opacity: 0.7 }}>
              {this.state.error.message}
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}