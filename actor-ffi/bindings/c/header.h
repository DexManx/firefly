typedef void (*Callback)(const char *response);

extern "C" {

void send_message(const char *message, Callback callback);

} // extern "C"
