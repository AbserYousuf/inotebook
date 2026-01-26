export default function LoginAlert(props) {
  const { message, success, updatemessage } = props;

  setTimeout(() => {
    updatemessage(null);
  }, 2000);

  return (
    <>
      {message && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            zIndex: 9999,
            width: "400px",
          }}
        >
          <div
            className={success ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </>
  );
}
