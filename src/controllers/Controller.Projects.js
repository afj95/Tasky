const Project = require('../models/project');
const { Response } = require('../tools/Response');
const { isValidObjectId } = require('mongoose');

const getProjects = (req, res) => {

    const params = {
        status: 'active',
        deleted: false,
        ...req.query,
        ...req.body
    }
    
    const {status, deleted } = params;

    Project.find({
        status: status,
        deleted: deleted
    }, { '__v': 0 })
    .populate('supervisor', { 'name': 1, 'phoneNumber': 1 })
    .exec((err, projects) => {
        if(err) {
            return res.status(500).send(Response(
                'Error while searching the projects',
                500,
                {error: err.message})
            )
        } else {
            return res.status(200).send(Response(
                'Founded',
                200,
                { projects: projects }
            ))
        }
    })
}

const addProject = (req, res) => {
    if(
        req?.body?.name1 &&
        req?.body?.name2 &&
        req?.body?.description &&
        req?.body?.supervisor &&
        req?.body?.tasks &&
        req?.body?.tasks.length > 0
    ) {
        let newProject = new Project(req.body);
    
        newProject.save((err, savedProject) => {
            if(err) {
                return res.status(500).send(Response(
                    'Error while saving the project',
                    500,
                    {error: err.message})
                )
            } else if(savedProject) {
                return res.status(201).json(Response(
                    'Saved project',
                    201,
                    { 'new proejct': savedProject }
                ))
            } else {
                return res.status(500).json(Response(
                    'Error happened',
                    500,
                ))
            }
        })
    } else {
        return res.status(400).json(Response(
            'Fields required',
            400,
        ))
    }
}

// Move project from active to finished but NOT deleted.
const finishProject = (req, res) => {

    const params = {
        ...req.query,
        ...req.body
    }

    const { project_id } = params;

    // if(Object.keys(req?.query).length !== 0) {
    //     project_id = req?.query?.project_id;
    // } else {
    //     project_id = req?.body?.project_id;
    // }

    if(isValidObjectId(project_id)) {
        Project.findOne({
            _id: project_id,
            status: 'active'
        }, (err, project) => {
            if(err) {
                return res.status(500).send(Response(
                    'Error while searching the project',
                    500,
                    {error: err?.message})
                )
            } else if(project) {
                project.status = 'finished';
                project?.save((err, savedProejct) => {
                    if(err) {
                        return res.status(500).send(Response(
                            'Error while saving the project',
                            500,
                            {error: err?.message})
                        )
                    } else {
                        return res.status(200).send(Response(
                            'Success',
                            200,
                            { 'project': savedProejct }
                        ))
                    }
                })
            } else {
                return res.status(404).send(Response(
                    'Not found',
                    404
                ))
            }
        })
    } else {
        return res.status(400).send(Response(
            'Not valid id',
            400
        ))
    }
}

// Assign the project as deleted project.
const deleteProject = (req, res) => {

    const params = {
        ...req.query,
        ...req.body
    }

    const { project_id } = params;

    // let project_id;

    // if(Object.keys(req?.query).length !== 0) {
    //     project_id = req?.query?.project_id;
    // } else {
    //     project_id = req?.body?.project_id;
    // }

    if(isValidObjectId(project_id)) {
        Project.findOne({
            _id: project_id,
            deleted: false
        }, (err, project) => {
            if(err) {
                return res.status(500).send(Response(
                    'Error while searching the project',
                    500,
                    {error: err?.message})
                )
            } else if(project) {
                project.deleted = true;
                project?.save((err, savedProejct) => {
                    if(err) {
                        return res.status(500).send(Response(
                            'Error while saving the project',
                            500,
                            {error: err?.message})
                        )
                    } else {
                        return res.status(200).send(Response(
                            'Success',
                            200,
                            { 'changed project': savedProejct }
                        ))
                    }
                })
            } else {
                return res.status(404).send(Response(
                    'Not found',
                    404
                ))
            }
        })
    } else {
        return res.status(400).send(Response(
            'Not valid id',
            400
        ))
    }
}

const editProject = (req, res) => {

    const params = {
        ...req.query,
        ...req.body
    }

    const { project_id } = params;

    // let project_id;

    // if(Object.keys(req?.query).length !== 0) {
    //     project_id = req?.query?.project_id;
    // } else {
    //     project_id = req?.body?.project_id;
    // }
    
    // const params = req.body || req.query || {};
    // const { project_id } = params;
    
    if(project_id && isValidObjectId(project_id)) {
        
        let { project_id: id, ...rest } = req?.body;
        
        Project.findByIdAndUpdate(project_id, {'$set': { ...rest }}, { new: true }, (err, project) => {
            if(err) {
                return res.status(500).send(Response(
                    'Error while searching the projects',
                    500,
                    {error: err.message})
                )
            } else if(project) {
                return res.status(200).send(Response(
                    'Saved',
                    200,
                    { project: project }
                ))
            } else {
                return res.status(404).send(Response(
                    'Not found the project',
                    404
                ))
            }
        })
    } else {
        return res.status(400).send(Response(
            'Not valid id or no id',
            400
        ))
    }
}

module.exports = {
    getProjects,
    addProject,
    finishProject,
    deleteProject,
    editProject
}