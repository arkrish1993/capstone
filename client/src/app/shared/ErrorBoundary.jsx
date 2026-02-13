import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-fluid bg-dark bg-gradient vh-100 d-flex align-items-center justify-content-center">
          <div
            className="card border-danger shadow p-5 text-center"
            style={{ maxWidth: 500 }}
          >
            <h4 className="text-danger mb-3">Something went wrong</h4>
            <p className="text-muted">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              className="btn btn-success py-3 mt-3"
              onClick={this.handleReload}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
