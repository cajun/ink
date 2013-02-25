
use Rack::Static, urls: %w(/css /js /img)
run ->(env) {[200,{'Content-Type' => 'text/html'}, File.open('index.html', File::RDONLY)] }
