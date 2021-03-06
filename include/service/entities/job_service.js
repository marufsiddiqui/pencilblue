/*
    Copyright (C) 2014  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Provides the ability to interact with jobs that have already been created.
 * @class JobService
 * @constructor
 */
function JobService(){
    this.type = 'job_run';
}

/**
 * Retrieves the log entries for the specified job from the start date up until
 * the current time.
 * @method getLogs
 * @param {String} jid The job ID
 * @param {Date} startingDate The lower bound on the "created" field of the log
 * entry
 * @param {Function} cb A callback that takes two parameters: cb(Error, Array)
 */
JobService.prototype.getLogs = function(jid, startingDate, cb) {

    var where = {
        job_id: jid,
        created: {$gte: startingDate}
    };
    var orderBy = [
        ['created', pb.DAO.ASC]
    ];

    var dao = new pb.DAO();
    dao.query('job_log', where, pb.DAO.SELECT_ALL, orderBy).then(function(result) {
        cb(util.isError(result) ? result : null, result);
    });
};

/**
 * Retrieves the job descriptor by ID
 * @method loadById
 * @param {String} jid The job's ID
 * @param {Function} cb A callback that takes two parameters: cb(Error, Object)
 */
JobService.prototype.loadById = function(jid, cb) {
    var dao = new pb.DAO();
    dao.loadById(jid, this.type, cb);
};

//exports
module.exports = JobService;
