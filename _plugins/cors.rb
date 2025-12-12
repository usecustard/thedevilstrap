# Add CORS headers for local development
# This fixes issues when accessing resources from localhost vs 127.0.0.1

Jekyll::Hooks.register :site, :post_write do |site|
  # Only apply in development
  if Jekyll.env == 'development'
    Jekyll.logger.info "CORS:", "Headers enabled for development"
  end
end

# Monkey patch WEBrick to add CORS headers
if defined?(WEBrick)
  module WEBrick
    class HTTPResponse
      alias_method :original_setup_header, :setup_header
      
      def setup_header
        original_setup_header
        
        # Add CORS headers
        self['Access-Control-Allow-Origin'] = '*'
        self['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        self['Access-Control-Allow-Headers'] = 'Content-Type'
      end
    end
  end
end
