class LoggedExceptionsMailer < ActionMailer::Base
  cattr_accessor :mailer_config
  @@mailer_config = {
                    :deliver     => false,
                    :subject     => 'Exception',
                    :recipients  => "",
                    :from        => '',
                    :link        => ''
                  }

  def exception
    @subject      = mailer_config[:subject]
    @recipients   = mailer_config[:recipients]
    @from         = mailer_config[:from]
    @sent_on      = Time.now
    @content_type = "text/html"
    @body[:link]  = mailer_config[:link]
  end
end