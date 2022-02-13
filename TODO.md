 * Standard.JS -- read through it, figure out how to get VSCode to help.
 * Tags
 * Links are preserved?
 * Date in filename
 * Upload to S3 bucket (with gzip compression)
 * Run as Lambda
 * Tweak margins and font/font size
 * EPUB output?
 * Send notification of failed Lambdas
   - Via e-mail (SparkPost)
   - Via SMS (Twilio)
   - CloudWatch alarm -> SNS message -> Lambda to send notifications?
   - That can be done as a separate project; use it across all my Lambdas in USW2/EUW2.
