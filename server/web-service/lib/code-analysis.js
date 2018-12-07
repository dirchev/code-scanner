const CONFIG = require('./analyse_config')
var CLIEngine = require("eslint").CLIEngine
var cli = new CLIEngine(CONFIG)

class CodeAnalysis {
  constructor(CodeSubmission, fileService) {
    this.queue = [];
    this.inProgress = false;
    this.CodeSubmission = CodeSubmission;
    this.fileService = fileService;
    setInterval(() => {
      if (this.inProgress) return
      if (this.queue.length) {
        this._processSubmission(this.queue.pop())
      }
    }, 2000)
  }

  async addToQueue(submissionId) {
    let submission = await this.CodeSubmission.findById(submissionId);
    submission.status = "in queue";
    await submission.save();
    this.queue.unshift(submission._id);
  }

  async _processSubmission(submissionId) {
    this.inProgress = true
    let submission = await this.CodeSubmission.findById(submissionId);
    submission.status = "processing";
    await submission.save();
    let file
    try {
      file = await this.fileService.readFile(submission.file_id);
    } catch (e) {
      submission.status = "error";
      return await submission.save();
    }
    if (!file) {
      submission.status = "error";
      return await submission.save();
    }

    var result = cli.executeOnText(file);
    let errors = result.results[0].messages.map(function (item) {
      return {
        line: item.line,
        character: item.column,
        text: item.message,
        type: 'error'
      }
    })
    submission.analysisResult = errors
    submission.status = 'processed'
    await submission.save()
    this.inProgress = false
  }
}

module.exports = CodeAnalysis
